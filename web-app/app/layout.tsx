import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const myFont = localFont({
	src: "../public/Geist-Regular.otf",
	variable: "--font-geist-regular",
});

export const metadata: Metadata = {
	title: "Aftercinema",
	openGraph: {
		title: "Aftercinema",
		description:
			"Plonge dans Aftercinema, le nouveau podcast qui célèbre l'après-cinéma!",
		locale: "fr_FR",
		type: "website",
		url: "https://aftercinema.fr",
		siteName: "Aftercinema.fr",
	},
	metadataBase: new URL("https://aftercinema.fr"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body
				suppressHydrationWarning
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					myFont.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
