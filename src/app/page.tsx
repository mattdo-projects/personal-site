import Image from "next/image";
import Link from "next/link";
import "material-symbols"
import {siGithub} from "simple-icons";

import styles from "./page.module.css";
import UserCommitHistory from "@/app/userCommitHistory";

const techStackCodeList = ["C", "C++", "C#", "Python", "Java", "TypeScript", "SQL"];
const techStackToolsList = ["Postgres", "Redis", "git", "Linux", "Docker", "Node.js", "React"];

export default function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>
                    <Link href={"/"}>mattdo.dev</Link>
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

            <button className={styles.buttonStyled}>
                <Link href={`https://github.com/mattdo-dev`}>Github</Link>
            </button>

            < UserCommitHistory />
        </main>
    );
}
