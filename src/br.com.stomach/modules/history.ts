import { IntefaceArtless } from "../models/interface_artless";
import { Artless } from "../models/artless";
import { Request, Response } from "express";
const url = "mongodb+srv://jonas:freedown@cluster0.28oko.azure.mongodb.net/letterDB?retryWrites=true&w=majority";
const database = "letterDB";
const collection = "artless";

class MasterHitory {

    public hello: string = 'artless project';
    
    public async save(req: Request, res: Response) {
        const list: Array<IntefaceArtless> = [];
        req.body.list.forEach((index: any) => {
            const artless: Artless = new Artless(req.body.export, req.body.framework, index.name, index.date_in, index.date_out, index.check, index.description);
            const inteface_artless: IntefaceArtless = new IntefaceArtless(index.name, artless);
            list.push(inteface_artless);
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
        const all = await document.find({}).toArray();

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

export const History = new MasterHitory();