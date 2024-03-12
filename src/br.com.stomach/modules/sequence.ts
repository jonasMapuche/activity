import { InterfaceMalware } from "../models/interface_malware";
import { Malware } from "../models/malware";
import { Request, Response } from "express";
const url = "mongodb+srv://jonas:freedown@cluster0.28oko.azure.mongodb.net/letterDB?retryWrites=true&w=majority";
const database = "letterDB";
const collection = "malware";

class MasterSequence {

    public hello: string = 'malware project';

    public async save(req: Request, res: Response) {
        const list: Array<InterfaceMalware> = [];
        req.body.list.forEach((index: any) => {
            const malware: Malware = new Malware(req.body.export, req.body.framework, index.name, index.rank, index.description);
            const interface_malware: InterfaceMalware = new InterfaceMalware(index.name, malware);
            list.push(interface_malware);
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
        const all = await document.find({ 'malware.framework': parameter }).toArray();

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

export const Sequence = new MasterSequence();