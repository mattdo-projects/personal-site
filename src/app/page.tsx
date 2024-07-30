import Link from "next/link";
import "material-symbols"

import UserCommitHistory from "@/components/user-commit-history/user-commit-history";
import styles from "./page.module.css";
import { fetchCommits } from "@/components/user-commit-history/fetch-commits";
import React from "react";

const intro =
    "Hi! I'm Matt (Hoang Son) Do, and if there's something that takes too long to do manually, " +
    "chances are that I will write a program to make it faster.";
const techStackCodeList = ["C", "C++", "C#", "Python", "Java", "TypeScript", "SQL"];
const techStackToolsList = ["Postgres", "Redis", "git", "Linux", "Docker", "Node.js", "React", "Windows"];

export default async function Page() {
    const {commits, error} = await fetchCommits();

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>
                    <Link href={"/"}>{process.env.NEXT_PUBLIC_SITE_URL}</Link>
                </h1>

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>sentiment_content</span>
                    <div className={styles.techStackCard}>
                        {intro}
                    </div>
                </section>

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>link</span>
                    <div className={styles.techStackCard}>
                        <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
                            github.com/{process.env.ALIAS}
                        </Link>
                    </div>
                </section>

                {/*<section className={styles.techStack}>*/}
                {/*    <span className={`${styles.techStackIcon} material-symbols-outlined`}>alternate_email</span>*/}
                {/*    <div className={styles.techStackCard}>*/}
                {/*        <Link href={`mailto:domattgmt7@gmail.com`}>*/}
                {/*            domattgmt7@gmail.com*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</section>*/}

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>code</span>
                    <div className={styles.techStackCard}>
                        {techStackCodeList.map((tech) => (
                            <div className={styles.techStackCardItems} key={tech}>{tech}</div>
                        ))}
                    </div>
                </section>

                <section className={styles.techStack}>
                    <span className={`${styles.techStackIcon} material-symbols-outlined`}>terminal</span>
                    <div className={styles.techStackCard}>
                        {techStackToolsList.map((tech) => (
                            <div className={styles.techStackCardItems} key={tech}>{tech}</div>
                        ))}
                    </div>
                </section>
            </section>

            <hr/>

            <section className={styles.techStack}>
                <span className={`${styles.techStackIcon} material-symbols-outlined`}>new_releases</span>
                <h3 className={styles.techStackCard}>
                    Recent Commits:
                </h3>
            </section>

            <UserCommitHistory commits={commits} error={error}/>
        </main>
    );
}
