import { formatDate } from "@angular/common";

export class Garde {
    dateDebut: String;
    dateFin: String;
    prix: number;
    clientId: number;
    chatId: number;
    id: number;

    constructor(
        dateDebut: Date = new Date(Date.now()),
        dateFin: Date = new Date(Date.now()),
        prix?: number,
        clientId?: number,
        chatId?: number,

         )
         {
            this.dateDebut = "";
            this.dateFin = "";
            this.prix = prix;
            this.clientId = clientId;
            this.chatId = chatId;
            this.id  = 0;
    }
}