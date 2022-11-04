import App from "./App.js";
import Digramme from "./Digramme.js";
import Monogramme from "./Monogramme.js";
export default class Trigramme {
    static frequences = {};
    static compilerFrequences(frequences) {
        var digrammes = {};
        for (const trigramme in frequences) {
            var digramme = trigramme.slice(0,2);
            var lettre = trigramme[2];
            if (digrammes[digramme] === undefined) {
                digrammes[digramme] = {};
            }
            digrammes[digramme][lettre] = frequences[trigramme];
        }
        for (const digramme in digrammes) {
            const frequencesTrigrammes = digrammes[digramme];
            var somme = this.calculerSomme(frequencesTrigrammes);
            var point = 0;
            for (const lettre in frequencesTrigrammes) {
                const frequence = frequencesTrigrammes[lettre];
                point += frequence / somme;
                frequencesTrigrammes[lettre] = Math.round(point * 100000000000000) / 100000000000000;
            }
        }
        this.frequences = digrammes;
        return this.frequences;
    }
    static calculerSomme(objet) {
        var somme = 0;
        for (let cle in objet) {
            somme += objet[cle];
        }
        return somme;
        // Façon "moderne"
        // return Object.values(objet).reduce((previous, current) => previous + current, 0);
    }
    static pigerPour(digramme) {
        if (this.frequences[digramme] === undefined) {
            return Digramme.pigerPour(digramme[1]);
        }
        var digrammes = Object.keys(this.frequences[digramme]);
        var frequences = Object.values(this.frequences[digramme]);
        var point = Math.random();
        var idx = this.trouverPoint(frequences, point);
        return digrammes[idx];
    }
    static trouverPoint(frequences, point) {
        for (let i = 0; i < frequences.length; i++) {
            if (frequences[i] > point) {
                return i;
            }
        }
        return frequences.length - 1;
        // Façon "moderne"
        // return frequences.findIndex(frequence => frequence >= point);
    }
    static pigerChaine(longueur, chaine = "") {
        if (longueur === 0) {
            return chaine;
        }
        if (chaine.length === 0) {
            chaine = Monogramme.pigerLettre(Monogramme.lettres, 2);
        } else if (chaine.length === 1) {
            chaine = chaine + Digramme.pigerPour(chaine);
        } else {
            chaine = chaine + this.pigerPour(chaine.slice(-2));
        }
        return this.pigerChaine(longueur - 1, chaine);
    }
    static init() {
        return App.chargerJSON("donnees/trigrammes-mini.json").then(data => {
            return this.compilerFrequences(data);
        });
    }
}
