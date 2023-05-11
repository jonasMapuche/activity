import { Activity } from "../models/activity";

export class InterfaceActivity {

    name: Array<String>;
    activity: Activity;

    constructor(name: Array<string>, activity: Activity) {
        this.name = name;
        this.activity = activity;
    }

}
