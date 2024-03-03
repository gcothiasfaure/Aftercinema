fetch("http://127.0.0.1:8000/get-episodes")
	.then((response) => response.json())
	.then((data) => {
		console.log("hey");
		// Récupérer les identifiants des épisodes
		const episodeIds = data["episode-ids"];

		// Récupérer le conteneur où vous souhaitez ajouter les balises iframe
		const container = document.getElementById("iframe-container");

		// Parcourir les identifiants des épisodes et créer les balises iframe
		episodeIds.forEach((episodeId) => {
			// Créer l'URL de l'épisode
			const url = `https://embed.acast.com/65d49906c4c0ce0016eadf8c/${episodeId}?theme=light&cover=false&episode-order=asc&subscribe=false&share=false`;

			// Créer la balise iframe
			const iframe = document.createElement("iframe");
			iframe.src = url;
			iframe.frameborder = "0";
			iframe.width = "100%";
			iframe.height = "190px";

			// Ajouter la balise iframe au conteneur
			container.appendChild(iframe);
		});
	})
	.catch((error) => {
		console.error("Erreur lors de la récupération des épisodes :", error);
	});
