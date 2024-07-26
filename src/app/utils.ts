// Filter commits within a certain time period
export interface Commit {
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
    repositoryName: string;
}

export interface Repository {
    name: string;
    commits_url: string;
}

export const filterCommitsByDate = (commits: Commit[], days: number) => {
    const currentDate = new Date();
    return commits.filter(commit => {
        const commitDate = new Date(commit.commit.author.date);
        const diffTime = Math.abs(currentDate.getTime() - commitDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    });
};

// Filter commits within the defined time period
export const timeSince = (date: string) => {
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
    // Add more checks as needed
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