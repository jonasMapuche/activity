import { Activity } from "../models/activity";
import { Equation } from "../models/equation";
import { Formula } from "../models/formula";
import { Request, Response } from "express";
const url_activity = "mongodb+srv://labrouste:freedown@clusteractivity.7ojqzwx.mongodb.net/?retryWrites=true&w=majority&appName=clusteractivity";
const url_chord = "mongodb+srv://labrouste:freedown@clusterchord.1l3obed.mongodb.net/?retryWrites=true&w=majority&appName=clusterchord";
const url_noten = "mongodb+srv://labrouste:freedown@clusternoten.kr5l5n7.mongodb.net/?retryWrites=true&w=majority&appName=clusternoten";
const database = "stomach";
const collection = "activity";

class MasterPhysical {

    public hello: string = 'activity project';

    public async save(req: Request, res: Response) {
        const list: Array<Activity> = [];
        req.body.equation.forEach((index: any) => {
            const formula: Formula = new Formula(req.body.name, req.body.initial, req.body.description);
            const equation: Equation = new Equation(index.initial, index.prefix, index.signal, index.sequence, index.description);
            const activity: Activity = new Activity(index.name, formula, equation);
            list.push(activity);
        });

        this.write(list);

        return res.json(list);
    }

    public async write (activity: Array<Activity>) {

        const MongoClient = require('mongodb').MongoClient;

        const client_activity = await MongoClient.connect(url_activity, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_activity = client_activity.db(database);
        const document_activity = db_activity.collection(collection);
        document_activity.insertMany(activity);

        const client_chord = await MongoClient.connect(url_chord, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_chord = client_chord.db(database);
        const document_chord = db_chord.collection(collection);
        document_chord.insertMany(activity);

        const client_noten = await MongoClient.connect(url_noten, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_noten = client_noten.db(database);
        const document_noten = db_noten.collection(collection);
        document_noten.insertMany(activity);

    }

    public async getAll(req: Request, res: Response) {
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_activity, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find().toArray();

        return res.json(all);
    }

    public async getFramework(req: Request, res: Response) {
        const parameter = req.params.id;
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_activity, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'formula.name': parameter }).toArray();

        return res.json(all);
    }

    public async getName(req: Request, res: Response) {
        const parameter = req.params.id;
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_activity, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'name': parameter }).toArray();

        return res.json(all);
    }
    
}

export const Physical = new MasterPhysical();