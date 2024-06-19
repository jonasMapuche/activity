import { Epigraph } from "./epigraph";

export class Artless {

    name: Array<String>;
    framework: String;
    date_in: Date;
    date_out: Date;
    description: String; 
    epigraph: Epigraph;

    constructor(name: Array<String>, framework: String, date_in: String, date_out: String, description: String, epigraph: Epigraph) {
        this.name = name;
        this.framework = framework;
        const in_date: Array<String> = date_in.split('/');
        this.date_in = new Date(in_date[2] + '-' + in_date[1] + '-' + in_date[0]);
        const out_date: Array<String> = date_out.split('/');
        this.date_out = new Date(out_date[2] + '-' + out_date[1] + '-' + out_date[0]);;
        this.description = description;
        this.epigraph = epigraph;
    }

}
