import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

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

const myFont = localFont({
	src: "../public/Geist-Regular.otf",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body suppressHydrationWarning={true} className={myFont.className}>
				{children}
			</body>
		</html>
	);
}
