import React from "react";
import type { Metadata } from "next";

import "material-symbols/outlined.css";
import "./globals.css";
import { urbanist } from "@/app/fonts";

export const metadata: Metadata = {
    title: "World of Do",
    description: "Personal site page of Hoang Son (Matthew) Do.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={urbanist.className}>
        <body>
            {children}
        </body>
        </html>
    );
}
