export default class Texte {
    static main() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "../discours.txt");
        xhr.addEventListener("load", e => {
            var app = document.getElementById("app");
            console.log(e.currentTarget.response);
            var discours = e.currentTarget.response;
            var titre = app.appendChild(document.createElement("h1"));
            titre.innerHTML = discours;
        });
        xhr.send();
    }
    static loadText(fichier) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", fichier);
            xhr.addEventListener("load", e => {
                resolve(e.currentTarget.response);
            });
            xhr.send();
        });
    }
    static loadHTML(fichier) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", fichier);
            xhr.responseType = "document";
            xhr.addEventListener("load", e => {
                resolve(e.currentTarget.response);
            });
            xhr.send();
        });
    }
    static loadJSON(fichier) {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("get", fichier);
            xhr.responseType = "json";
            xhr.addEventListener("load", e => {
                resolve(e.currentTarget.response);
            });
            xhr.send();
        });
    }
}