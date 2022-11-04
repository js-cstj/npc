import App from "./App.js";

export default class Race {
	static html_races() {
		// "Race du perso"
		var resultat = document.createElement("fieldset");
		var div = resultat.appendChild(document.createElement("div"));
		var label = div.appendChild(document.createElement("label"));
		label.innerHTML = "Race du personnage";
		var select = div.appendChild(document.createElement("select"));
		label.htmlFor = select.name = "class_perso";
		App.chargerJSON("https://www.dnd5eapi.co/api/races").then(races => {
			for (let i = 0; i < races.results.length; i++) {
				var race = races.results[i];
				var option = select.appendChild(document.createElement("option"));
				option.innerHTML = race.name;
				option.value = race.index;
				option.setAttribute("data-url", race.url);
			}
			var courant = App.piger(select.children);
			courant.selected = true;
		});
		var description = div.appendChild(document.createElement("div"));
		description.classList.add("description");
		select.addEventListener("change", e => {
			var choisi = e.currentTarget.selectedOptions[0];
			var url = choisi.dataset.url;
			App.chargerJSON("https://www.dnd5eapi.co" + url + "").then(race => {
				description.innerHTML = race.size_description;
			});
		});
		return resultat;
	}
}
