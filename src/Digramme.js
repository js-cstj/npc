import App from "./App.js";
import Monogramme from "./Monogramme.js";
export default class Digramme {
    static frequences = {};
    static compilerFrequences(frequences) {
        for (let lettre in frequences) {
            let frequencesLettre = frequences[lettre];
            let ratios = this.calculerRatios(frequencesLettre);
            let points = this.calculerPoints(ratios);
            this.frequences[lettre] = this.arrondirValeurs(points, 14);
        }
        return this.frequences;
    }
    static arrondirValeurs(tableau, decimales = 0) {
        var dec = Math.pow(10, decimales);
        var resultat = [];
        for (let i = 0; i < tableau.length; i++) {
            resultat.push(Math.round(tableau[i] * dec) / dec);
        }
        return resultat;
        // Façon "moderne" --------------------------------------------
        // var dec = Math.pow(10, decimales);
        // return tableau.map(valeur => Math.round(valeur * dec) / dec);
    }
    static calculerPoints(ratios) {
        var point = 0;
        var resultat = [];
        for (let i = 0; i < ratios.length; i++) {
            point += ratios[i];
            resultat.push(point);
        }
        return resultat;
        // Façon "moderne" --------------------------------------------
        // var point = 0;
        // return ratios.map(ratio => (ratio === 0) ? point : (point += ratio));
    }
    static calculerRatios(tableau) {
        var somme = this.calculerSomme(tableau);
        var resultat = [];
        for (let i = 0; i < tableau.length; i++) {
            resultat.push(tableau[i] / somme);
        }
        return resultat;
        // Façon "moderne" --------------------------------------------
        // return tableau.map(qte => qte / somme);
    }
    static calculerSomme(tableau) {
        var somme = 0;
        for (let i = 0; i < tableau.length; i++) {
            somme += tableau[i];
        }
        return somme;
        // Façon "moderne" --------------------------------------------
        // return tableau.reduce((previous, current) => previous + current, 0);
    }
    static pigerPour(lettre) {
        var point = Math.random();
        var idx = this.trouverPoint(this.frequences[lettre], point);
        return "abcdefghijklmnopqrstuvwxyz"[idx];
    }
    static trouverPoint(frequences, point) {
        for (let i = 0; i < frequences.length; i++) {
            if (frequences[i] > point) {
                return i;
            }
        }
        return frequences.length - 1;
        // Façon "moderne" --------------------------------------------
        // return frequences.findIndex(frequence => frequence >= point);
    }
    static pigerChaine(longueur, chaine = "") {
        if (longueur === 0) {
            return chaine;
        }
        if (chaine === "") {
            chaine = Monogramme.pigerLettre(Monogramme.lettres, 2);
        } else {
            chaine = chaine + this.pigerPour(chaine.slice(-1));
        }
        return this.pigerChaine(longueur - 1, chaine);
    }
    static init() {
        return App.loadJSON("donnees/digrammes.json").then(data => {
            return this.compilerFrequences(data);
        });
    }
}
