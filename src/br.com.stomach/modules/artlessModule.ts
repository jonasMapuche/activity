import { Artless } from "../models/artless";
import { Epigraph } from "../models/epigraph";
import { Request, Response } from "express";
const url_artless = "mongodb+srv://hipaciazatz:freedown@artless.yapo55a.mongodb.net/?appName=artle"
const url_artless_test = "mongodb+srv://hipaciawang:freedown@artless.9lumvd1.mongodb.net/?appName=artless";
const url_artless_production = "mongodb+srv://berthazatz:freedown@artless.3twaubu.mongodb.net/?appName=artless";
const database = "stomach";
const collection = "artless";
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(url_artless, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_test = new MongoClient(url_artless_test, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_production = new MongoClient(url_artless_production, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

class MasterHitory {

    public hello: string = 'artless project';
    
    public async save(req: Request, res: Response) {
        try {
            const epigraph: Epigraph = new Epigraph(req.body.epigraph.name, req.body.epigraph.date_in, req.body.epigraph.date_out, req.body.epigraph.title);
            const artless: Artless = new Artless(req.body.name, req.body.framework, req.body.date_in, req.body.date_out, req.body.description, epigraph);
            this.write(artless);
            return res.json(artless);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async write (artless: Artless) {
        try {
            await client.connect();
            const db_artless = client.db(database);
            const document_artless = db_artless.collection(collection);
            document_artless.insertOne(artless);

            await client_production.connect();
            const db_letter = client_production.db(database);
            const document_letter = db_letter.collection(collection);
            document_letter.insertOne(artless);

            await client_test.connect();
            const db_recipe = client_test.db(database);
            const document_recipe = db_recipe.collection(collection);
            document_recipe.insertOne(artless);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            await client.connect();
            const db = client.db(database);
            const document = db.collection(collection);
            const all = await document.find({}).toArray();
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

    public async postRange(req: Request, res: Response) {
        try {
            const in_date: Array<String> = req.body.date_in.split('/');
            const date_in: Date = new Date(in_date[2] + '-' + in_date[1] + '-' + in_date[0]);
            const out_date: Array<String> = req.body.date_out.split('/');
            const date_out: Date = new Date(out_date[2] + '-' + out_date[1] + '-' + out_date[0]);
            await client.connect();
            const db = client.db(database);
            const document = db.collection(collection);
            const all = await document.find({
                    $and: [{
                            date_in: {$gte:date_in},
                            date_out: {$lte:date_out}
                    }]
            }).toArray();
            return res.json(all);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}

export const History = new MasterHitory();