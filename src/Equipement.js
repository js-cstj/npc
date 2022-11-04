import App from "./App.js";

export default class Equipement {
    static html_categories() {
        var resultat = document.createElement("fieldset");
        var div = resultat.appendChild(document.createElement("div"));
        var label = div.appendChild(document.createElement("label"));
        label.innerHTML = "Catégorie d'équipement";
        var select = div.appendChild(document.createElement("select"));
        label.htmlFor = select.name = select.id = "categorie_equipement";
        var option = select.appendChild(document.createElement("option"));
        option.innerHTML = "Choisissez une catégorie...";
        App.chargerJSON(App.api + "/api/equipment-categories").then(categories => {
            categories = categories.results;
            for (let i = 0; i < categories.length; i++) {
                const categorie = categories[i];
                var option = select.appendChild(document.createElement("option"));
                option.innerHTML = categorie.name;
                option.value = categorie.index;
                option.dataset.url = categorie.url;
            }
        });        
        return resultat;
    }
}