import { Commit } from "@/app/interface";

export const fetchCommits = async (): Promise<{ commits: Commit[], error: string | null }> => {
    const API_SECRET_KEY = process.env.API_SECRET_KEY as string;

    try {
        const response = await fetch(`${process.env.ROOT_URL}/api/github/page`, {
            headers: {'x-api-key': API_SECRET_KEY},
        });

        if (!response.ok) throw new Error("Failed to fetch repositories");

        const commits: Commit[] = await response.json();

        return {
            commits,
            error: null,
        };
    } catch (error) {
        console.error('Error fetching repositories:', error);

        return {
            commits: [],
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
};