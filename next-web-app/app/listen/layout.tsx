import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Écoute Aftercinema",
};

export default function ListenLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
