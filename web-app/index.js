// icônes du menu
const emailIconElement = document.getElementById("email-icon");
const shareIconElement = document.getElementById("share-icon");
const bellIconElement = document.getElementById("bell-icon");

// icône de fermeture de la popup
const closeIconElement = document.getElementById("close-icon");

// controlleurs du formulaire (bell)
const emailInputElement = document.getElementById("email-input");
const formElement = document.getElementById("form");

// toasts
const toastBellPopupContentElement = document.getElementById(
	"toast-bell-popup-content"
);

// contenus des popups
const mailPopupContentElement = document.getElementById("mail-popup-content");
const sharePopupContentElement = document.getElementById("share-popup-content");
const bellPopupContentElement = document.getElementById("bell-popup-content");

// popup entière
const popupElement = document.getElementById("popup");

// définition des timeouts
var timeoutShare;
var timeoutBell;

// copier texte dans presse-papier
function copyTextToClipboard(text) {
	const dummyInputElement = document.createElement("input");
	document.body.appendChild(dummyInputElement);
	dummyInputElement.value = text;
	dummyInputElement.select();
	document.execCommand("copy");
	document.body.removeChild(dummyInputElement);
}

// fonction de clic sur l'icône share
function clickOnShareIcon() {
	copyTextToClipboard("https://aftercinema.fr");

	// affichage du contenu de la popup share
	sharePopupContentElement.style.display = "block";
	popupElement.style.display = "flex";

	timeoutShare = setTimeout(function () {
		// masquage du contenu de la popup share
		popupElement.style.display = "none";
		sharePopupContentElement.style.display = "none";
	}, 3000);
}

// listener de l'icône share
shareIconElement.addEventListener("click", clickOnShareIcon);

// fonction de clic sur l'icône bell
function clickOnBellIcon() {
	// affichage du contenu de la popup bell
	bellPopupContentElement.style.display = "block";
	popupElement.style.display = "flex";
}

// listener de l'icône bell
bellIconElement.addEventListener("click", clickOnBellIcon);

// fonction de reset de la popup mail
function resetEmailPopup() {
	bellPopupContentElement.style.display = "none";
	mailPopupContentElement.style.display = "none";
	sharePopupContentElement.style.display = "none";
	popupElement.style.display = "none";
	toastBellPopupContentElement.style.display = "none";
	formElement.style.display = "flex";
	emailInputElement.value = "";
}

// fonction de clic sur l'icône close
function clickOnCloseIcon() {
	resetEmailPopup();
	clearTimeout(timeoutBell);
	clearTimeout(timeoutShare);
}

// listener de l'icône close
closeIconElement.addEventListener("click", clickOnCloseIcon);

// fonction de l'envoie du formulaire
async function submitForm(event) {
	event.preventDefault();

	const emailValue = emailInputElement.value;
	emailInputElement.value = "";

	toastBellPopupContentElement.style.display = "block";
	formElement.style.display = "none";

	timeoutBell = setTimeout(function () {
		resetEmailPopup();
	}, 3000);

	const response = await fetch(
		"https://api.aftercinema.fr/store-email?email=" + emailValue
	);
	const responseMsg = await response.json();
	console.log(responseMsg);
}

// listener de l'envoi du formulaire
formElement.addEventListener("submit", submitForm);

// fonction de clic sur l'icone mail
function clickOnEmailIcon() {
	mailPopupContentElement.style.display = "block";
	popupElement.style.display = "flex";
}

// lisener de l'icone mail
emailIconElement.addEventListener("click", clickOnEmailIcon);
