// Filter commits within a certain time period
export interface RawCommit {
    sha: string;
    url: string;
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
}

export interface Commit {
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
    repositoryName: string;
    files?: File[];
}

export interface File {
    filename: string;
    additions: number;
    deletions: number;
    status: string; // 'added', 'removed', 'modified'
}

export interface Repository {
    name: string;
    commits_url: string;
}