import App from "./App.js";

export default class Feat {
    static html_feats() {
        var resultat = document.createElement("fieldset");
        var div = resultat.appendChild(document.createElement("div"));
        var label = div.appendChild(document.createElement("label"));
        label.innerHTML = "Feats";
        var select = div.appendChild(document.createElement("select"));
        label.htmlFor = select.name = select.id = "feats";
        var option = select.appendChild(document.createElement("option"));
        option.innerHTML = "Choisissez un feat...";
        App.chargerJSON(App.api + "/api/feats").then(feats => {
            feats = feats.results;
            for (let i = 0; i < feats.length; i++) {
                const feat = feats[i];
                var option = select.appendChild(document.createElement("option"));
                option.innerHTML = feat.name;
                option.value = feat.index;
                option.dataset.url = feat.url;
            }
        });        
        return resultat;
    }
}