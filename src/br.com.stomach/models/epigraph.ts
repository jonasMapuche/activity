export class Epigraph {

    name: String;
    date_in: Date;
    date_out: Date;
    title: String;

    constructor(name: String, date_in: String, date_out: String, title: String) {
        this.name = name;
        const in_date: Array<String> = date_in.split('/');
        this.date_in = new Date(in_date[2] + '-' + in_date[1] + '-' + in_date[0]);
        const out_date: Array<String> = date_out.split('/');
        this.date_out = new Date(out_date[2] + '-' + out_date[1] + '-' + out_date[0]);;
        this.title = title;
    }

}
