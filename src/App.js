import digrammes from "../donnees/digrammes.js";
import Digramme from "./Digramme.js";
import Monogramme from "./Monogramme.js";

export default class App {
	static races = [
		"Human",
		"Elf",
		"Dwarf",
		"Half-Elf",
		"Halfling",
		"Tiefling",
		"Half-Orc",
		"Gnome",
		"Dragonborn",
	];
	static main() {
		var app = document.getElementById("app");
		var form = app.appendChild(this.html_form());
	}
	static html_form() {
		var resultat = document.createElement("form");
		resultat.addEventListener("input", e => {
			e.preventDefault();
			console.log("Cool!");
		});
		// "Nom du joueur"
		var div = resultat.appendChild(document.createElement("div"));
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Nom du joueur";
		var input = div.appendChild(document.createElement("input"));
		label.htmlFor = input.name = input.id = "nom_joueur";

		// "Nom du perso"
		var div = resultat.appendChild(document.createElement("div"));
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Nom du personnage";
		var input = div.appendChild(document.createElement("input"));
		label.htmlFor = input.name = input.id = "nom_perso";
		input.value = "" + this.prenomAlea() + " " + this.nomAlea() + "";
		resultat.appendChild(this.html_races());
		resultat.appendChild(this.html_classes());

		return resultat;
	}
	static html_races() {
		// "Race du perso"
		var div = document.createElement("div");
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Race du personnage";
		var select = div.appendChild(document.createElement("select"));
		label.htmlFor = select.name = "race_perso";
		this.loadJSON("https://www.dnd5eapi.co/api/races").then(races => {
			for (let i = 0; i < races.results.length; i++) {
				const race = races.results[i];
				var option = select.appendChild(document.createElement("option"));
				option.innerHTML = race.name;
				option.value = race.index;
				option.setAttribute("data-url", race.url);
			}
			var courant = this.piger(select.children);
			courant.selected = true;
		});
		var description = div.appendChild(document.createElement("div"));
		description.classList.add("description");
		select.addEventListener("change", e => {
			var choisi = e.currentTarget.selectedOptions[0];
			var url = choisi.dataset.url;
			this.loadJSON("https://www.dnd5eapi.co" + url + "").then(race => {
				description.innerHTML = race.size_description;
			});
		});
		return div;
	}
	static html_classes() {
		// "Classe du perso"
		var div = document.createElement("div");
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Classe du personnage";
		var select = div.appendChild(document.createElement("select"));
		label.htmlFor = select.name = "class_perso";
		this.loadJSON("https://www.dnd5eapi.co/api/classes").then(classes => {
			for (let i = 0; i < classes.results.length; i++) {
				var classe = classes.results[i];
				var option = select.appendChild(document.createElement("option"));
				option.innerHTML = classe.name;
				option.value = classe.index;
				option.setAttribute("data-url", classe.url);
			}
			var courant = this.piger(select.children);
			courant.selected = true;
		});
		return div;
	}

	static main0() {
		var app = document.getElementById("app");
		// app.appendChild(this.html_tableau());
		window.addEventListener("click", e => {
			var p = app.appendChild(document.createElement("p"));
			this.loadJSON("https://api.chucknorris.io/jokes/random").then(blague => {
				p.innerHTML = blague.value;
			})
		})
		var persos = [];
		for (let i = 0; i < 100; i += 1) {
			persos.push(this.persoAlea());
		}
		// console.log(persos);
	}
	static html_tableau() {
		var resultat;
		resultat = document.createElement("table");
		resultat.border = "1";
		var thead = resultat.appendChild(document.createElement("thead"));
		var tr = thead.appendChild(document.createElement("tr"));
		var th = tr.appendChild(document.createElement("th"));
		th.innerHTML = "Nom";
		var th = tr.appendChild(document.createElement("th"));
		th.innerHTML = "Prénom";
		var tbody = resultat.appendChild(document.createElement("tbody"));
		var tr = tbody.appendChild(document.createElement("tr"));
		var td = tr.appendChild(document.createElement("td"));
		td.innerHTML = "Raté";
		var td = tr.appendChild(document.createElement("td"));
		td.innerHTML = "Rita";
		return resultat;
	}
	static range(min, max, biais = 1) {
		var resultat = Math.random();
		resultat = Math.pow(resultat, biais);
		resultat = Math.floor(resultat * (max - min + 1)) + min;
		return resultat;
	}
	static piger(tableau, biais = 1) {
		var resultat;
		var pos = this.range(0, tableau.length - 1, biais);
		resultat = tableau[pos];
		return resultat;
	}
	static persoAlea() {
		var resultat = {
			race: this.raceAlea(),
			prenom: this.prenomAlea(),
			nom: this.nomAlea(),
			age: this.ageAlea(),
			taille: this.tailleAlea(),
			poids: this.poidsAlea(),
			force: this.statAlea(),
			agilete: this.statAlea(),
			constitution: this.statAlea(),
			intelligence: this.statAlea(),
			sagesse: this.statAlea(),
			charisme: this.statAlea(),
			pointsdevietotal: this.range(15, 100, 2),
			// toString: function() {return `${this.prenom} ${this.nom} (${this.race} de ${this.age} ans)`},
		};
		resultat.pointsdevierestants = this.range(0, resultat.pointsdevietotal, .5);
		return resultat;
	}
	static prenomAlea() {
		return this.formater(Monogramme.motAlea(this.range(4, 8, 2)));
	}
	static nomAlea(longueur = 6) {
		return this.formater(Monogramme.motAlea(this.range(6, 12, 2)));
	}
	static raceAlea() {
		return this.piger(this.races, 2);
	}
	static formater(mot) {
		return mot[0].toUpperCase() + mot.slice(1);
	}
	static ageAlea() {
		var resultat;
		resultat = this.range(18, 120);
		return resultat;
	}
	static tailleAlea() {
		var resultat;
		resultat = this.range(48, 84);
		return resultat;
	}
	static formatTaille(pouces) {
		var pieds = Math.floor(pouces / 12);
		var pouces = pouces % 12;
		resultat += pieds + " pieds";
		if (pouces > 0) {
			resultat += " et " + pouces + " pouces";
		}
		return resultat;
	}
	static poidsAlea() {
		var resultat;
		resultat = this.range(1600, 4800);
		return resultat;
	}
	static formatPoids(onces) {
		var livres = Math.floor(onces / 16);
		var onces = onces % 16;
		var resultat = "";
		resultat += livres + " livres";
		if (onces > 0) {
			resultat += " et " + onces + " onces";
		}
		return resultat;
	}
	static statAlea() {
		return this.range(10, 20, 2);
	}
	static loadJSON(fic) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", fic);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response);
			});
			xhr.send();
		});
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
