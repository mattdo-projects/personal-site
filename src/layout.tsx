import type { Metadata } from "next";
import { urbanist } from "@/fonts";
import "material-symbols/outlined.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "World of Do",
    description: "Personal site page of Hoang Son (Matthew) Do.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={urbanist.className}>{children}</body>
        </html>
    );
}
