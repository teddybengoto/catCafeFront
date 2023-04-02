import { Adresse } from "./adresse";

export class Compte {

    id: number;
    login: string;
    nom: string;
    prenom: string;
    password: string;
    telephone: string;
    adresse: Adresse

    constructor(
        id?: number,
        login?: string,
        nom?: string,
        prenom?: string,
        password?: string,
        telephone?: string,
        adresse?: Adresse) {
            this.id=id;
            this.adresse=adresse;
            this.login=login;
            this.nom=nom;
            this.prenom=prenom;
            this.password=password;
            this.telephone=telephone


    }

}