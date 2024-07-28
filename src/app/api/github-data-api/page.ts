import type { NextApiRequest, NextApiResponse } from 'next';
import { RawCommit, Repository } from '@/app/interface';

import WithApiKey from "@/middleware/withApiKey";

const MAX_REPOS = 75;
const MAX_COMMITS_PER_REPO = 50;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL as string;
    const GITHUB_USN = process.env.NEXT_PUBLIC_GITHUB_USN as string;
    const GITHUB_TOK = process.env.GITHUB_TOK as string;

    if (!GITHUB_URL || !GITHUB_USN || !GITHUB_TOK) {
        return res.status(500).json({error: "Missing GitHub environment variables"});
    }

    try {
        const repoResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USN}/repos?per_page=${MAX_REPOS}&sort=updated`,
            {headers: {'Authorization': `Bearer ${GITHUB_TOK}`}}
        );

        if (!repoResponse.ok)
            throw new Error("Failed to fetch repositories");

        const repos: Repository[] = await repoResponse.json();

        const commitPromises = repos.map(async (repo) => {
            try {
                const commitsResponse = await fetch(
                    `${repo.commits_url.replace('{/sha}', '')}?per_page=${MAX_COMMITS_PER_REPO}`,
                    {headers: {'Authorization': `Bearer ${GITHUB_TOK}`}}
                );

                if (!commitsResponse.ok)
                    throw new Error(`Failed to fetch commits for repository: ${repo.name}`);

                const repoCommits = await commitsResponse.json();

                return await Promise.all(repoCommits.map(async (commit: RawCommit) => {
                    try {
                        const commitDetailResponse = await fetch(commit.url, {
                            headers: {'Authorization': `Bearer ${GITHUB_TOK}`}
                        });

                        if (!commitDetailResponse.ok)
                            throw new Error(`Failed to fetch commit details for commit: ${commit.sha}`);

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

        res.status(200).json(allCommits);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        res.status(500).json({error: "Error fetching GitHub data"});
    }
};

export default handler;
