export class Chat {
    id: number;
    nom : string;
    sexe : string;
    race : string;
    adoptable : boolean;
    permanent : boolean;
    sterile : boolean;
    idPuce : string;
    idTatouage : string;
    pbSante : string;
    commentaire : string;
    image : string;
    naissance : string;
    client ?: any;

    constructor(id?: number,
        nom ?: string,
        sexe ?: string,
        race ?: string,
        adoptable ?: boolean,
        permanent ?: boolean,
        sterile ?: boolean,
        idPuce ?: string,
        idTatouage ?: string,
        pbSante ?: string,
        commentaire ?: string,
        image ?: string,
        naissance ?: string,
        client ?: any){
            this.nom=nom;
            this.sexe=sexe;
            this.race=race;
            this.adoptable=adoptable;
            this.permanent=permanent;
            this.sterile=sterile;
            this.idPuce=idPuce;
            this.idTatouage=idTatouage;
            this.pbSante=pbSante;
            this.commentaire=commentaire;
            this.image=image;
            this.naissance=naissance;
            this.client=client;
        }
}

export class ChatSend {
    id: number;
    nom : string;
    sexe : string;
    race : string;
    adoptable : boolean;
    permanent : boolean;
    sterile : boolean;
    idPuce : string;
    idTatouage : string;
    pbSante : string;
    commentaire : string;
    image : string;
    naissance : string;
    clientId ?: number;

    constructor(id?: number,
        nom ?: string,
        sexe ?: string,
        race ?: string,
        adoptable ?: boolean,
        permanent ?: boolean,
        sterile ?: boolean,
        idPuce ?: string,
        idTatouage ?: string,
        pbSante ?: string,
        commentaire ?: string,
        image ?: string,
        naissance ?: string,
        clientId ?: number,){
            this.nom=nom;
            this.sexe=sexe;
            this.race=race;
            this.adoptable=adoptable;
            this.permanent=permanent;
            this.sterile=sterile;
            this.idPuce=idPuce;
            this.idTatouage=idTatouage;
            this.pbSante=pbSante;
            this.commentaire=commentaire;
            this.image=image;
            this.naissance=naissance;
            this.clientId=clientId;
        }
}
