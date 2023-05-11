export class Artless {

    time_line: Date;
    framework: Array<String>;
    name: Array<String>;
    date_in: Date;
    date_out: Date;
    check: Boolean;
    description: String;

    constructor(time_line: Date, framework: Array<String>, name: Array<String>, date_in: Date, date_out: Date, check: Boolean, description: String) {
        this.time_line = time_line;
        this.framework = framework;
        this.name = name;
        this.date_in = date_in;
        this.date_out = date_out;
        this.check = check;
        this.description = description;
    }

}
