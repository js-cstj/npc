import App from "./App.js";

export default class Trait {
    static html_traits() {
        var resultat = document.createElement("fieldset");
        var div = resultat.appendChild(document.createElement("div"));
        var label = div.appendChild(document.createElement("label"));
        label.innerHTML = "Traits";
        var select = div.appendChild(document.createElement("select"));
        label.htmlFor = select.name = select.id = "traits";
        var option = select.appendChild(document.createElement("option"));
        option.innerHTML = "Choisissez un trait...";
        App.chargerJSON(App.api + "/api/traits").then(traits => {
            traits = traits.results;
            for (let i = 0; i < traits.length; i++) {
                const trait = traits[i];
                var option = select.appendChild(document.createElement("option"));
                option.innerHTML = trait.name;
                option.value = trait.index;
                option.dataset.url = trait.url;
            }
        });        
        return resultat;
    }
}