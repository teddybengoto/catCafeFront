export class Auth {

    token: string;
    success: boolean;
    id: number;
    /*login: string;
    nom: string;
    prenom: string;
    password: string;*/

    constructor(
        id?: number,
        success?: boolean,
        token?: string,
        /*login?: string,
        nom?: string,
        prenom?: string,
        password?: string,*/
    ) {


        this.id = id;
        this.token= token;
        this.success= success;
        /*this.login= login;
        this.nom= nom;
        this.prenom= prenom;
        this.password= password;*/
    }


}