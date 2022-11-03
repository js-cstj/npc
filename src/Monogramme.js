import App from "./App.js";

export default class Monogramme {
	static voyelles = "eeaiuoy";
	static consonnes = "stnrldcmpvqfbghjxzkw";
	static lettres = "eesaitnruoldcmpvqfbghjxzykw";

	static pigerLettre(string, biais = 1) {
		var resultat;
		var pos = App.range(0, string.length - 1, biais);
		resultat = string[pos];
		return resultat;
	}
	static chaineAlea(longueur = 10) {
		var resultat = "";
		for (let i = 0; i < longueur; i += 1) {
			var vc = Math.random();
			if (vc < .5) {
				resultat += this.pigerLettre(this.voyelles);
			} else {
				resultat += this.pigerLettre(this.consonnes);
			}
		}
		return this.formater(resultat);
	}
	static motAlea(longueur = 0) {
		if (longueur === 0) {
			longueur = App.range(4, 15, 2);
		}
		var resultat = "";
		var biais = 1.5;
		if (Math.random() < .5) {
			resultat += this.pigerLettre(this.voyelles, biais);
		} else {
			resultat += this.pigerLettre(this.consonnes, biais);
		}
		for (let i = 1; i < longueur; i++) {
			if (this.estVoyelle(resultat.slice(-1)) === true) {
				resultat += this.pigerLettre(this.consonnes, biais);
			} else if (resultat.length >= 2 && this.estConsonne(resultat.slice(-2, 1)) === true) {
				resultat += this.pigerLettre(this.voyelles, biais);
			} else {
				if (i === longueur - 1) {
					if (Math.random() < .9) {
						resultat += this.pigerLettre(this.voyelles, biais);
					} else {
						resultat += this.pigerLettre(this.consonnes, biais);
					}
				} else {
					if (Math.random() < .5) {
						resultat += this.pigerLettre(this.voyelles, biais);
					} else {
						resultat += this.pigerLettre(this.consonnes, biais);
					}
				}
			}
		}
		return resultat;
	}
	static estVoyelle(lettre) {
		return this.voyelles.includes(lettre);
	}
	static estConsonne(lettre) {
		return this.consonnes.includes(lettre);
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		return Promise.resolve();
	}
}
