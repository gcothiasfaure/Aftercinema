import LogoContainer from "@/components/logo-container";
import ActionBtn from "@/components/action-btn";

import Image from "next/image";
import sneha from "@/public/podcasters/sneha.png";
import walid from "@/public/podcasters/walid.png";
import nina from "@/public/podcasters/nina.png";
import gaspard from "@/public/podcasters/gaspard.png";

import EmailMenuBtn from "@/components/menu-btn/email-menu-btn";
import ShareMenuBtn from "@/components/menu-btn/share-menu-btn";
import BellMenuBtn from "@/components/menu-btn/bell-menu-btn";

export default function Home() {
	return (
		<div className="bg-gradient-to-t from-backgroundbottom to-white pb-24">
			<div className="fixed top-0 w-[100vw] z-50">
				<div className="flex justify-end m-2 max-w-screen-sm mx-2 sm:mx-auto">
					<div className="flex">
						<div className="mr-2">
							<EmailMenuBtn />
						</div>
						<div className="mr-2">
							<BellMenuBtn />
						</div>
						<div>
							<ShareMenuBtn />
						</div>
					</div>
				</div>
			</div>
			<LogoContainer />
			<div className="max-w-screen-sm sm:mx-auto mx-2">
				<div className="mt-12">
					<h1 className="text-5xl sm:text-6xl font-bold">Aftercinema</h1>
					<p>Le nouveau podcast qui célèbre l'après-cinéma !</p>
				</div>

				<div className="flex justify-center mt-16 mb-24">
					<ActionBtn />
				</div>

				<div className="mt-12">
					<h2 className="text-h2color text-2xl font-bold">
						Aftercinema c'est quoi ?
					</h2>
					<p>
						Aftercinema réunit quatre amis partageant une passion commune pour
						le cinéma. Entre couple, mais aussi amitiés de longue date, on
						t'invite à nous retrouver chaque mois pour une discussion sans
						prétention autour des nouvelles sorties ciné. Au cœur de notre
						podcast, découvre nos avis sur trois ou quatre films qu'on a vu et
						sélectionné au cours du mois.
					</p>
					<p className="mt-2">
						Explore également avec nous dans un épisode bonus : une thématique
						inspirée par l'un des films pour aller plus loin sur un thème, la
						carrière d'une personnalité ou le debrief d'un événement
						incontournable du cinéma.
					</p>
				</div>
				<div className="mt-12">
					<h2 className="text-h2color text-2xl font-bold">
						Aftercinema c'est qui ?
					</h2>
					<div className="max-w-md mx-auto">
						<div className="flex items-end">
							<Image
								src={sneha}
								alt="Portait d'un podcaster : Snéha"
								width={75}
								height={75}
								style={{ marginRight: 10, borderRadius: "0.25rem" }}
							/>
							<p>Snéha, future psychiatre mais surtout fan de Sezane</p>
						</div>
						<div className="flex justify-end items-end mt-3">
							<p className="text-end">
								Walid, consultant en développement durable mais toujours prêt à
								prendre l'avion pour Rafaël Nadal
							</p>
							<Image
								src={walid}
								alt="Portait d'un podcaster : Walid"
								width={75}
								height={75}
								style={{ marginLeft: 10, borderRadius: "0.25rem" }}
							/>
						</div>
						<div className="flex items-end mt-3">
							<Image
								src={nina}
								alt="Portait d'un podcaster : Nina"
								width={75}
								height={75}
								style={{ marginRight: 10, borderRadius: "0.25rem" }}
							/>
							<p>
								Nina deux licences et deux masters dans les médias mais toujours
								au chômage
							</p>
						</div>
						<div className="flex justify-end items-end">
							<p className="text-end">
								Gaspard, ingénieur en informatique et grand adepte de pastis
							</p>
							<Image
								src={gaspard}
								alt="Portait d'un podcaster : Gaspard"
								width={75}
								height={75}
								style={{ marginLeft: 10, borderRadius: "0.25rem" }}
							/>
						</div>
					</div>
				</div>
				<div className="mt-12">
					<h2 className="text-h2color text-2xl font-bold">
						Aftercinema c'est où et c'est quand ?
					</h2>
					<p>C'est tous les mois sur ta plateforme de podcast !</p>
				</div>
				<div className="flex justify-center mt-16 mb-8">
					<ActionBtn />
				</div>
			</div>
		</div>
	);
}