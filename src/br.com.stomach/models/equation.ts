export class Equation {

    initial: string;
    prefix: string;
    signal: string;
    sequence: number;
    description: string;
    
    constructor(initial: string, prefix: string, signal: string, sequence: number, description: string) {
        this.initial = initial;
        this.prefix = prefix;
        this.signal = signal;
        this.sequence = sequence;
        this.description = description;
    }

}
