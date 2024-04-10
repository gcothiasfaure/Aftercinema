"use client";

import styles from "./icon-container.module.css";

export default function IconContainer({ iconLabel }: { iconLabel: string }) {
	return (
		<div className={styles.iconContainer}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{iconLabel === "home" && (
					<>
						<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</>
				)}
				{iconLabel === "bell" && (
					<>
						<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
						<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
					</>
				)}
				{iconLabel === "email" && (
					<>
						<rect width="20" height="16" x="2" y="4" rx="2" />
						<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
					</>
				)}
				{iconLabel === "share" && (
					<>
						<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
						<polyline points="16 6 12 2 8 6" />
						<line x1="12" x2="12" y1="2" y2="15" />
					</>
				)}
			</svg>
		</div>
	);
}
