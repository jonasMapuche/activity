import { InterfaceActivity } from "../models/interface_activity";
import { Activity } from "../models/activity";
import { Request, Response } from "express";
const url = "mongodb+srv://jonas:freedown@cluster0.28oko.azure.mongodb.net/letterDB?retryWrites=true&w=majority";
const database = "letterDB";
const collection = "activity";

class MasterSport {

    public hello: string = 'activity project';

    public async save(req: Request, res: Response) {
        const list: Array<InterfaceActivity> = [];
        req.body.list.forEach((index: any) => {
            const acitivy: Activity = new Activity(req.body.export, req.body.framework, index.name, index.check, index.description);
            const interface_activity: InterfaceActivity = new InterfaceActivity(index.name, acitivy);
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
        const all = await document.find({ 'activity.framework': parameter }).toArray();

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