import React from "react";
import styles from './user-commit-history.module.css';
import { Commit } from "@/app/interface";
import {
    calculateTotalChanges,
    filterCommitsByDate,
    getCommitType,
    getIconForCommitType,
    timeSince
} from "@/utils/utils";

const TIME_PERIOD_DAYS = 60;

interface UserCommitHistoryProps {
    commits: Commit[];
    error: string | null;
}

const UserCommitHistory: React.FC<UserCommitHistoryProps> = ({commits, error}) => {
    if (error) return (
        <div className={styles.commitHistory}>
            <div className={styles.commitPreview}>
                <span className={`${styles.techStackIcon} material-symbols-outlined red`}>
                    error
                </span>
                <div className={styles.commitPreviewContent}>
                    <div className={`${styles.code} red`}>Error: Failed to display public commit history. Call the
                        dev!
                    </div>
                </div>
            </div>
        </div>
    );

    const filteredCommits = filterCommitsByDate(commits, TIME_PERIOD_DAYS);

    return (
        <div className={styles.commitHistory}>
            {filteredCommits.map((commit, index) => {
                const totalChanges = calculateTotalChanges(commit.files);

                return (
                    <div className={`${styles.commitItem} ${styles.code}`} key={index}>
                        <span className={`${styles.techStackIcon} material-symbols-outlined`}>
                            {getIconForCommitType(getCommitType(commit.commit.message))}
                        </span>

                        <div className={styles.commitDetails}>
                            <h3 className={styles.codeEmph}>{commit.repositoryName}</h3>
                            <div className={styles.commitChanges}>
                                <div className={`${styles.commitChangesItem} dark-grey`}>{totalChanges.fileCount} files
                                    <p className={styles.expandedLabel}>changed</p>
                                </div>
                                <div className={`${styles.commitChangesItem} green`}>{totalChanges.additions}
                                    <p className={styles.expandedLabel}> insertions</p>
                                    (+)
                                </div>
                                <div className={`${styles.commitChangesItem} red`}>{totalChanges.deletions}
                                    <p className={styles.expandedLabel}> deletions</p>
                                    (-)
                                </div>
                            </div>
                            <p className={styles.commitMessage}>{commit.commit.message}</p>
                            <p className={styles.commitDate}>Committed {timeSince(commit.commit.author.date)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserCommitHistory;
