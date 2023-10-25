
export default class App {
	static main() {
		var app = document.getElementById("app");
		var form = app.appendChild(this.html_form());
	}
	static html_form() {
		var resultat = document.createElement("form");
		resultat.name = "perso";
		resultat.id = "perso";
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
App.init();
