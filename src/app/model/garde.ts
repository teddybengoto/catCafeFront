export class Garde {
    dateDebut: Date;
    dateFin: Date;
    prix: number;
    clientId: number;
    chatId: number;

    constructor(
        dateDebut?: Date,
        dateFin?: Date,
        prix?: number,
        clientId?: number,
        chatId?: number
         ){
            this.dateDebut = dateDebut;
            this.dateFin = dateFin;
            this.prix = prix;
            this.clientId = clientId;
            this.chatId = chatId;
    }
}