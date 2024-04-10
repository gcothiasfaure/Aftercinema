import styles from "./logo-container.module.css";
import Image from "next/image";
import logo from "./../../../public/logos/logo500x500px.png";

export default function LogoContainer() {
	return (
		<div className={styles.logoContainer}>
			<div className={styles.imgContainer}>
				<Image
					src={logo}
					alt="Logo d'Aftercinema"
					fill
					priority
					sizes="(max-width: 768px) 30vh, (max-width: 1200px) 30vw, 30vw"
				/>
			</div>
		</div>
	);
}
