import { Artless } from "../models/artless";

export class IntefaceArtless {

    name: Array<String>;
    artless: Artless;

    constructor(name: Array<string>, artless: Artless) {
        this.name = name;
        this.artless = artless;
    }

}
