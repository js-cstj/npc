import App from "./App.js";

export default class Classe {
	static html_classes() {
		// "Classe du perso"
		var resultat = document.createElement("fieldset");
		var div = resultat.appendChild(document.createElement("div"));
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Classe du personnage";
		var select = div.appendChild(document.createElement("select"));
		label.htmlFor = select.name = "class_perso";
		App.chargerJSON("https://www.dnd5eapi.co/api/classes").then(classes => {
			for (let i = 0; i < classes.results.length; i++) {
				var classe = classes.results[i];
				var option = select.appendChild(document.createElement("option"));
				option.innerHTML = classe.name;
				option.value = classe.index;
				option.setAttribute("data-url", classe.url);
			}
			var courant = App.piger(select.children);
			courant.selected = true;
		});
		return resultat;
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		window.addEventListener("load", () => {
			this.main();
		});
	}
}
