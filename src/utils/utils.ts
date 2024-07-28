import { Commit, File } from "@/app/interface";

export const filterCommitsByDate = (commits: Commit[], days: number): Commit[] => {
    const currentDate = new Date();
    const filteredCommits = commits.filter((commit) => {
        const commitDate = new Date(commit.commit.author.date);
        const diffTime = Math.abs(currentDate.getTime() - commitDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    });

    filteredCommits.sort((a: Commit, b: Commit) => {
        const dateA = new Date(a.commit.author.date).getTime();
        const dateB = new Date(b.commit.author.date).getTime();
        return dateB - dateA;
    })

    return filteredCommits;
};

export const timeSince = (date: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
};

export const getCommitType = (message: string): string => {
    if (message.toLowerCase().includes('merge')) return 'Merge';
    if (message.toLowerCase().includes('rebase')) return 'Rebase';
    return 'Commit';
};

export const getIconForCommitType = (type: string): string => {
    switch (type) {
        case 'Merge':
            return 'merge_type';
        case 'Rebase':
            return 'swap_vert';
        default:
            return 'commit';
    }
};

export const calculateTotalChanges = (files?: File[]): { additions: number, deletions: number, fileCount: number } => {
    if (!files) return {additions: 0, deletions: 0, fileCount: 0};

    return files.reduce((acc, file) => ({
        additions: acc.additions + file.additions,
        deletions: acc.deletions + file.deletions,
        fileCount: acc.fileCount + 1,
    }), {additions: 0, deletions: 0, fileCount: 0});
};
