import styles from "./page.module.css";
import IconContainer from "./_components/icon-container/icon-container";
import LogoContainer from "./_components/logo-container/logo-container";
import ActionBtn from "./_components/action-btn/action-btn";
import Image from "next/image";
import sneha from "./../public/podcasters/sneha.png";
import walid from "./../public/podcasters/walid.png";
import nina from "./../public/podcasters/nina.png";
import gaspard from "./../public/podcasters/gaspard.png";

export default function Home() {
	return (
		<>
			<div className={styles.body}>
				<div className={styles.iconsContainer}>
					<div className={styles.iconsSubContainer}>
						<IconContainer iconLabel="email" />
						<IconContainer iconLabel="bell" />
						<IconContainer iconLabel="share" />
					</div>
				</div>
				<LogoContainer />

				<div className={styles.contentContainer}>
					<div className={styles.subjetContainer}>
						<h1 className={styles.h1}>Aftercinema</h1>
						<p>Le nouveau podcast qui célèbre l'après-cinéma!</p>
					</div>

					<ActionBtn />

					<div
						className={[styles.quoiContainer, styles.subjetContainer].join(" ")}
					>
						<h2 className={styles.h2}>Aftercinema c'est quoi ?</h2>
						<p>
							Aftercinema réunit quatre amis partageant une passion commune pour
							le cinéma. Entre couple, mais aussi amitiés de longue date, on
							t'invite à nous retrouver chaque mois pour une discussion sans
							prétention autour des nouvelles sorties ciné. Au cœur de notre
							podcast, découvre nos avis sur trois ou quatre films qu'on a vu et
							sélectionné au cours du mois.
						</p>
						<p className={styles.quoiSecondParaph}>
							Explore également avec nous dans un épisode bonus : une thématique
							inspirée par l'un des films pour aller plus loin sur un thème, la
							carrière d'une personnalité ou le debrief d'un événement
							incontournable du cinéma.
						</p>
					</div>
					<div className={styles.subjetContainer}>
						<h2 className={styles.h2}>Aftercinema c'est qui ?</h2>
						<div className={styles.quiContainer}>
							<div className={styles.quiSubContainer}>
								<Image
									src={sneha}
									alt="Portait d'un podcaster : Snéha"
									width={75}
									height={75}
									style={{ marginRight: 15, borderRadius: 10 }}
								/>
								<p>Snéha, future psychiatre mais surtout fan de Sezane</p>
							</div>
							<div className={styles.walidContainer}>
								<p className={styles.textAlignEnd}>
									Walid, consultant en développement durable mais toujours prêt
									à prendre l'avion pour Rafaël Nadal
								</p>
								<Image
									src={walid}
									alt="Portait d'un podcaster : Walid"
									width={75}
									height={75}
									style={{ marginLeft: 15, borderRadius: 10 }}
								/>
							</div>
							<div className={styles.quiSubContainer}>
								<Image
									src={nina}
									alt="Portait d'un podcaster : Nina"
									width={75}
									height={75}
									style={{ marginRight: 15, borderRadius: 10 }}
								/>
								<p>
									Nina deux licences et deux masters dans les médias mais
									toujours au chômage
								</p>
							</div>
							<div className={styles.gaspardContainer}>
								<p className={styles.textAlignEnd}>
									Gaspard, ingénieur en informatique et grand adepte de pastis
								</p>
								<Image
									src={gaspard}
									alt="Portait d'un podcaster : Gaspard"
									width={75}
									height={75}
									style={{ marginLeft: 15, borderRadius: 10 }}
								/>
							</div>
						</div>
					</div>
					<div className={styles.subjetContainer}>
						<h2 className={styles.h2}>Aftercinema c'est où et c'est quand ?</h2>
						<p>
							C'est tous les mois sur ta plateforme de streaming ou sur le web!
						</p>
					</div>
					<ActionBtn />
				</div>
			</div>
		</>
	);
}
