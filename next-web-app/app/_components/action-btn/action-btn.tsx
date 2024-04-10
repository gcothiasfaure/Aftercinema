import styles from "./action-btn.module.css";
import Link from "next/link";

export default function ActionBtn() {
	return (
		<div className={styles.actionBtn}>
			<Link href="/listen">
				<p>Écoute Aftercinema !</p>
			</Link>
		</div>
	);
}
