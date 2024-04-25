import { InterfaceActivity } from "../models/interface_activity";
import { Equation } from "../models/equation";
import { Formula } from "../models/formula";
import { Request, Response } from "express";
const url = "mongodb+srv://jonas:freedown@cluster0.28oko.azure.mongodb.net/letterDB?retryWrites=true&w=majority";
const database = "letterDB";
const collection = "activity";

class MasterSport {

    public hello: string = 'activity project';

    public async save(req: Request, res: Response) {
        const list: Array<InterfaceActivity> = [];
        req.body.equation.forEach((index: any) => {
            const formula: Formula = new Formula(req.body.name, req.body.initial, req.body.description);
            const equation: Equation = new Equation(index.initial, index.prefix, index.signal, index.sequence, index.description);
            const interface_activity: InterfaceActivity = new InterfaceActivity(index.name, req.body.date, formula, equation);
            list.push(interface_activity);
        });

        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        document.insertMany(list);

        return res.json(list);
    }

    public async getAll(req: Request, res: Response) {
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url, {
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
        const client = await MongoClient.connect(url, {
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
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'name': parameter }).toArray();

        return res.json(all);
    }
    
}

export const Sport = new MasterSport();