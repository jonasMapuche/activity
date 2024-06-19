import { Equation } from "./equation";
import { Formula } from "./formula";

export class Activity {

    name: Array<string>;
    formula: Formula;
    equation: Equation;

    constructor(name: Array<string>, formula: Formula, equation: Equation) {
        this.name = name;
        this.formula = formula;
        this.equation = equation;
    }

}
