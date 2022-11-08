export default class MagicSchool {
    static main() {
    }
    static html_ecoles() {
        //         <fieldset>
        //     <div>
        //<label for="class_perso">Race du personnage</label>
        //<select name="class_perso" id="class_perso">
        //             <option>Sélectionnez une école...</option>
        //             <option value="dragonborn" data-url="/api/races/dragonborn">Dragonborn</option>
        //             <option value="dwarf" data-url="/api/races/dwarf">Dwarf</option>
        //         </select>
        //     </div>
        // </fieldset>
        var fieldset = document.createElement("fieldset");
        var div = fieldset.appendChild(document.createElement("div"));
        var label = div.appendChild(document.createElement("label"));
        label.innerHTML = "École de magie";
        var select = div.appendChild(document.createElement("select"));
        label.htmlFor = select.name = select.id = "magic_school";
        var option = select.appendChild(document.createElement("option"));
        option.innerHTML = "Sélectionnez une école de magie...";
        this.chargerJson('https://www.dnd5eapi.co/api/magic-schools').then(ecoles => {
            console.log(ecoles.results);
            for (let i = 0; i < ecoles.results.length; i++) {
                const ecole = ecoles.results[i];
                var option = select.appendChild(document.createElement("option"));
                option.innerHTML = ecole.name;
                option.value = ecole.index;
                option.dataset.url = ecole.url;                
            }
        });
        return fieldset;

    }
    static main0() {
        this.chargerJson('https://api.chucknorris.io/jokes/random').then(blague => {
            // console.log(blague);
            var app = document.getElementById("app");
            var h1 = app.appendChild(document.createElement("h1"));
            h1.innerHTML = blague.value;
        });
        this.chargerTexte("donnees/discours.txt").then(texte => {
            var app = document.getElementById("app");
            var h2 = app.appendChild(document.createElement("h2"));
            h2.innerHTML = texte;
        });
        this.chargerXML("img/npc.svg").then(doc => {
            var path = doc.querySelector("g:nth-of-type(2)");
            var couleur = path.getAttribute("fill");
            console.log(couleur);
            var header = document.querySelector("header");
            header.style.backgroundColor = couleur;
            document.body.style.color = couleur;
        });
    }
    static chargerJson(url) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url);
            xhr.responseType = "json";
            xhr.addEventListener("load", e => {
                resolve(e.target.response); // Retourne les données
            });
            xhr.send();
        });
    } static chargerXML(url) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url);
            xhr.responseType = "document";
            xhr.addEventListener("load", e => {
                var doc = e.currentTarget.response;
                resolve(doc);
            });
            xhr.send();
        });
    }
    static chargerTexte(url) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url);
            xhr.addEventListener("load", e => {
                var discours = e.currentTarget.response;
                resolve(discours);
            });
            xhr.send();
        });
    }

}