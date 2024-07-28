import Link from "next/link";
import "material-symbols"

import UserCommitHistory from "@/components/user-commit-history/user-commit-history";
import styles from "./page.module.css";
import { fetchCommits } from "@/pages/api/github/fetch-commits";
import { SiGithub } from "@icons-pack/react-simple-icons";
import React from "react";


const techStackCodeList = ["C", "C++", "C#", "Python", "Java", "TypeScript", "SQL"];
const techStackToolsList = ["Postgres", "Redis", "git", "Linux", "Docker", "Node.js", "React"];

export default async function Page() {
    const {commits, error} = await fetchCommits();

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>
                    <Link href={"/"}>{process.env.NEXT_PUBLIC_SITE_URL}</Link>
                </h1>

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>code</span>
                    {techStackCodeList.map((tech) => (
                        <div className={styles.techStackCard} key={tech}>{tech}</div>
                    ))}
                </section>

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>terminal</span>
                    {techStackToolsList.map((tech) => (
                        <div className={styles.techStackCard} key={tech}>{tech}</div>
                    ))}
                </section>
            </section>

            <Link className={styles.commitHeader} href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
                <SiGithub size={20}/>
                <h3>Github</h3>
            </Link>
            <UserCommitHistory commits={commits} error={error}/>
        </main>
    );
}
