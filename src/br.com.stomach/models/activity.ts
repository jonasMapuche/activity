export class Activity {

    export: Date;
    framework: Array<String>;
    name: Array<String>;
    check: Boolean;
    description: String;
    
    constructor(time_line: Date, framework: Array<String>, name: Array<String>, check: Boolean, description: String) {
        this.export = time_line;
        this.framework = framework;
        this.name = name;
        this.check = check;
        this.description = description;
    }

}
