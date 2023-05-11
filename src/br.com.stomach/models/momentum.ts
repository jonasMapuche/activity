import { Malware } from "../models/malware";

export class Momentum {

    name: Array<String>;
    malware: Malware;

    constructor(name: Array<string>, malware: Malware) {
        this.name = name;
        this.malware = malware;
    }

}
