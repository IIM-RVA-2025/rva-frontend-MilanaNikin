import { Departman } from "./departman";
import { Status } from "./status";

export interface Student {
    id: number;
    ime: string;
    prezime: string;
    brojIndeksa: string;
    status: Status;
    departman: Departman
}
