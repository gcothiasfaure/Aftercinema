document
	.getElementById("link-logo-share")
	.addEventListener("click", () => copyTextToClipboard());
function copyTextToClipboard() {
	var dummy = document.createElement("input");
	document.body.appendChild(dummy);
	dummy.value = "https://aftercinema.fr/listen";
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
	document.getElementById("toast").style.display = "block";
	var idsetTimeout = setTimeout(function () {
		document.getElementById("toast").style.display = "none";
	}, 5000);
}

document
	.getElementById("open-modal")
	.addEventListener("click", function (event) {
		document.getElementById("popup").style.display = "block";
	});
document
	.getElementById("close-popup")
	.addEventListener("click", function (event) {
		document.getElementById("popup").style.display = "none";
	});

document.getElementById("form").addEventListener("submit", function (event) {
	event.preventDefault();

	// Récupérer les données du formulaire
	var formData = new FormData(this);
	console.log(formData);

	document.getElementById("email").value = "";

	document.getElementById("toast-send-email").style.display = "block";
	var idsetTimeout = setTimeout(function () {
		document.getElementById("toast-send-email").style.display = "none";
	}, 4000);
	var idsetTimeout = setTimeout(function () {
		document.getElementById("popup").style.display = "none";
	}, 5000);

	// Envoyer les données à l'API via une requête fetch
	// fetch("http://your-fastapi-url/store-email/", {
	// 	method: "POST",
	// 	body: formData
	// })
	// .then(response => response.json())
	// .then(data => {
	// 	// Traiter la réponse de l'API ici
	// 	console.log(data);
	// 	alert("Email sent successfully!");
	// })
	// .catch(error => {
	// 	// Gérer les erreurs ici
	// 	console.error("Error:", error);
	// 	alert("An error occurred. Please try again later.");
	// });
});
