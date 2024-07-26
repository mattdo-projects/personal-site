"use client";

import React, { useEffect, useState } from "react";
import styles from '@/app/page.module.css';
import { RawCommit, Commit, Repository } from "@/app/interface";
import {
    calculateTotalChanges,
    filterCommitsByDate,
    getCommitType,
    getIconForCommitType,
    timeSince
} from "@/app/utils";

const GITHUB_USN = process.env.NEXT_PUBLIC_GITHUB_USERNAME as string;
const GITHUB_TOK = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string;

const MAX_REPOS = 100;
const MAX_COMMITS_PER_REPO = 10;
const TIME_PERIOD_DAYS = 30;

export default function UserCommitHistory() {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USN}/repos?per_page=${MAX_REPOS}&sort=updated`, {
                    headers: {'Authorization': `Bearer ${GITHUB_TOK}`}
                });

                if (!response.ok) throw new Error("Failed to fetch repositories");

                const repos: Repository[] = await response.json();
                const commitPromises = repos.map(async (repo) => {
                    try {
                        const commitsResponse = await fetch(`${repo.commits_url.replace('{/sha}', '')}?per_page=${MAX_COMMITS_PER_REPO}`, {
                            headers: {'Authorization': `Bearer ${GITHUB_TOK}`}
                        });

                        if (!commitsResponse.ok) throw new Error(
                            `Failed to fetch commits for repository: ${repo.name}`
                        );

                        const repoCommits = await commitsResponse.json();
                        // Fetch detailed commit information
                        return await Promise.all(repoCommits.map(async (commit: RawCommit) => {
                            try {
                                const commitDetailResponse = await fetch(commit.url, {
                                    headers: {'Authorization': `Bearer ${GITHUB_TOK}`}
                                });

                                if (!commitDetailResponse.ok) throw new Error(
                                    `Failed to fetch commit details for commit: ${commit.sha}`
                                );

                                const commitDetails = await commitDetailResponse.json();
                                return {...commitDetails, repositoryName: repo.name};
                            } catch (error) {
                                console.error('Error fetching commit details:', error);
                                return null;
                            }
                        }));
                    } catch (error) {
                        console.error('Error fetching commits:', error);
                        return [];
                    }
                });

                const allCommitsArray = await Promise.all(commitPromises);
                const allCommits = allCommitsArray.flat().filter(commit => !!commit);
                setCommits(allCommits);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setError(error instanceof Error ? error.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories().then(_ => {
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredCommits = filterCommitsByDate(commits, TIME_PERIOD_DAYS);

    return (
        <div className={styles.commitHistory}>
            {filteredCommits.map((commit, index) => {
                const totalChanges = calculateTotalChanges(commit.files);

                return (
                    <div className={styles.commitItem} key={index}>
                        <span className={`${styles.techStackIcon} material-symbols-outlined`}>
                            {getIconForCommitType(getCommitType(commit.commit.message))}
                        </span>
                        <div className={styles.commitDetails}>
                            <h3 className={styles.codeEmph}>{commit.repositoryName}</h3>
                            <p className={styles.code}>Committed: {timeSince(commit.commit.author.date)}</p>
                            <p>
                                {totalChanges.fileCount} files changed,
                                {totalChanges.additions} additions,
                                {totalChanges.deletions} deletions
                            </p>
                            <p className={styles.code}>{commit.commit.message}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
