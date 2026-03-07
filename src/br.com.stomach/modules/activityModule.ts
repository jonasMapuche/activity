import { Activity } from "../models/activity";
import { Equation } from "../models/equation";
import { Formula } from "../models/formula";
import { Request, Response } from "express";
const url_activity = "mongodb+srv://hipaciazatz:freedown@activity.pmq1ges.mongodb.net/?appName=activity";
const url_activity_test = "mongodb+srv://hipaciawang:freedown@activity.tplqsdx.mongodb.net/?appName=activity";
const url_activity_production = "mongodb+srv://berthazatz:freedown@activity.wdpcjci.mongodb.net/?appName=activity";
const database = "stomach";
const collection = "activity";
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(url_activity, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_test = new MongoClient(url_activity_test, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_production = new MongoClient(url_activity_production, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

class MasterPhysical {

    public hello: string = 'activity project';

    public async save(req: Request, res: Response) {
        try {
            const list: Array<Activity> = [];
            req.body.equation.forEach((index: any) => {
                const formula: Formula = new Formula(req.body.name, req.body.initial, req.body.description);
                const equation: Equation = new Equation(index.initial, index.prefix, index.signal, index.sequence, index.description);
                const activity: Activity = new Activity(index.name, formula, equation);
                list.push(activity);
            });
            this.write(list);
            return res.json(list);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async write (activity: Array<Activity>) {
        try {
            await client.connect();
            const db_activity = client.db(database);
            const document_activity = db_activity.collection(collection);
            document_activity.insertMany(activity);

            await client_test.connect();
            const db_chord = client_test.db(database);
            const document_chord = db_chord.collection(collection);
            document_chord.insertMany(activity);

            await client_production.connect();
            const db_noten = client_production.db(database);
            const document_noten = db_noten.collection(collection);
            document_noten.insertMany(activity);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            await client.connect();
            const db = client.db(database);
            const document = db.collection(collection);
            const all = await document.find().toArray();
            return res.json(all);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async getFramework(req: Request, res: Response) {
        try {
            const parameter = req.params.id;
            await client.connect();
            const db = client.db(database);
            const document = db.collection(collection);
            const all = await document.find({ 'formula.name': parameter }).toArray();
            return res.json(all);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async getName(req: Request, res: Response) {
        try {
            const parameter = req.params.id;
            await client.connect();
            const db = client.db(database);
            const document = db.collection(collection);
            const all = await document.find({ 'name': parameter }).toArray();
            return res.json(all);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}

export const Physical = new MasterPhysical();