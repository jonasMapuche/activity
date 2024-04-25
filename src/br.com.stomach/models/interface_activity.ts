import { Equation } from "./equation";
import { Formula } from "./formula";

export class InterfaceActivity {

    name: Array<string>;
    date: Date;
    formula: Formula;
    equation: Equation;

    constructor(name: Array<string>, date: Date, formula: Formula, equation: Equation) {
        this.name = name;
        this.date = date;
        this.formula = formula;
        this.equation = equation;
    }

}
