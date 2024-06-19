import { Malware } from "../models/malware";
import { Request, Response } from "express";
const url_malware = "mongodb+srv://labrouste:freedown@clustermalware.jfsjtmu.mongodb.net/?retryWrites=true&w=majority&appName=clustermalware";
const url_artless = "mongodb+srv://labrouste:freedown@clusterartless.uqtq9ou.mongodb.net/?retryWrites=true&w=majority&appName=clusterartless";
const url_recipe = "mongodb+srv://labrouste:freedown@clusterrecipe.lj4yu2l.mongodb.net/?retryWrites=true&w=majority&appName=clusterrecipe";
const database = "stomach";
const collection = "malware";

class MasterSequence {

    public hello: string = 'malware project';

    public async save(req: Request, res: Response) {
        const list: Array<Malware> = [];
        req.body.list.forEach((index: any) => {
            const malware: Malware = new Malware(index.name, index.description, req.body.framework);
            list.push(malware);
        });

        this.write(list);

        return res.json(list);
    }

    public async write (list: Array<Malware>) {
        const MongoClient = require('mongodb').MongoClient;
        const client_malware = await MongoClient.connect(url_malware, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_malware = client_malware.db(database);
        const document_malware = db_malware.collection(collection);
        document_malware.insertMany(list);

        const client_artless = await MongoClient.connect(url_artless, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_artless = client_artless.db(database);
        const document_artless = db_artless.collection(collection);
        document_artless.insertMany(list);

        const client_recipe = await MongoClient.connect(url_recipe, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_recipe = client_recipe.db(database);
        const document_recipe = db_recipe.collection(collection);
        document_recipe.insertMany(list);
    }

    public async getAll(req: Request, res: Response) {

        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_malware, {
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
        const client = await MongoClient.connect(url_malware, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'framework': parameter }).toArray();

        return res.json(all);
    }

    public async getName(req: Request, res: Response) {
        const parameter = req.params.id;
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_malware, {
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