import { Combo } from "./combo";

export class Seminar {

    name: string;
    framework: Array<String>;
    note: string; 
    set: number;
    combo: Combo;

    constructor(name: string, framework: Array<string>, note: string, set: number, combo: Combo) {
        this.name = name;
        this.framework = framework;
        this.note = note;
        this.set = set;
        this.combo = combo;
    }

}
