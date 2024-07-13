"use client";

import Image from "next/image";

import { usePostHog } from "posthog-js/react";

import logo500x500pxwhitebg from "@/public/logos/logo500x500pxbeigebg.png";
import spotifyLogo from "@/public/platforms/spotify.png";
import deezerLogo from "@/public/platforms/deezer.png";
import youtubeLogo from "@/public/platforms/youtube.png";
import applePodcastLogo from "@/public/platforms/apple-podcast.png";
import instagramLogo from "@/public/platforms/instagram.png";

export default function PlatformBtn({
	platformLabel,
}: {
	platformLabel: string;
}) {
	const posthog = usePostHog();

	const getUrl = () => {
		if (platformLabel === "Spotify") {
			return "https://open.spotify.com/show/2KOkfi3CO92Rn03JK0CvIg";
		}
		if (platformLabel === "Instagram") {
			return "https://www.instagram.com/aftercinema.podcast";
		}
		if (platformLabel == "Deezer") {
			return "https://deezer.page.link/yxtgraNQ82HEwZkU7";
		}
		if (platformLabel === "YouTube") {
			return "https://www.youtube.com/playlist?list=PLA75TyAwTPpmU0UuoPGXciOMcE9ipNLgT";
		} else {
			return "https://podcasts.apple.com/fr/podcast/aftercinema/id1736993975";
		}
	};

	const getImg = () => {
		if (platformLabel === "Spotify") {
			return spotifyLogo;
		}
		if (platformLabel === "Instagram") {
			return instagramLogo;
		}
		if (platformLabel == "Deezer") {
			return deezerLogo;
		}
		if (platformLabel === "YouTube") {
			return youtubeLogo;
		} else {
			return applePodcastLogo;
		}
	};

	return (
		<a
			onClick={() => {
				posthog.capture("Platform button clicked", {
					$platform: platformLabel,
				});
			}}
			href={getUrl()}
			target="_blank"
		>
			<div className="p-1 w-[90vw] sm:w-96 bg-primary text-white rounded-md cursor-pointer transition-colors hover:bg-primary/90 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
				<div className="grid grid-cols-[auto_1fr] gap-2">
					<div className="relative h-12 w-12 rounded">
						<Image
							src={logo500x500pxwhitebg}
							alt="Logo du podcast"
							width={60}
							height={60}
							style={{ borderRadius: "calc(var(--radius) - 4px)" }}
						/>
					</div>

					<div className="flex items-center justify-center">
						<p className="text-center sm:text-lg">
							Aftercinema sur {platformLabel}
						</p>
						<div className="ml-2">
							<Image
								src={getImg()}
								alt="Logo plateforme"
								width={20}
								height={20}
							/>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
}
