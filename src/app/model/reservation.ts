import { Espace } from "./espace";

export class Reservation{

    id: number;
    effectif: number;
    jour: string;
    heure: string;
    espace: Espace;
    client_id: number;
    client:any;
    
    constructor (id?: number, effectif?:number, jour?: string, heure?: string, espace?: Espace, client_id?: number){
        this.id=id;
        this.effectif=effectif;
        this.jour=jour;
        this.heure=heure;
        this.espace=espace;
        this.client_id=client_id;
    }
}