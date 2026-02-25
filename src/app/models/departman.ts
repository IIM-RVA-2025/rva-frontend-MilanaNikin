import { Fakultet } from "./fakultet";

export interface Departman {
    id: number;
    naziv: string;
    oznaka: string;
    fakultet: Fakultet;
}
