import { Artless } from "../models/artless";
import { Epigraph } from "../models/epigraph";
import { Request, Response } from "express";
const url_artless = "mongodb+srv://labrouste:freedown@clusterartless.uqtq9ou.mongodb.net/?retryWrites=true&w=majority&appName=clusterartless";
const url_letter = "mongodb+srv://labrouste:freedown@clusterletter.hh85dxs.mongodb.net/?retryWrites=true&w=majority&appName=clusterletter";
const url_recipe = "mongodb+srv://labrouste:freedown@clusterrecipe.lj4yu2l.mongodb.net/?retryWrites=true&w=majority&appName=clusterrecipe";
const database = "stomach";
const collection = "artless";

class MasterHitory {

    public hello: string = 'artless project';
    
    public async save(req: Request, res: Response) {
        const epigraph: Epigraph = new Epigraph(req.body.epigraph.name, req.body.epigraph.date_in, req.body.epigraph.date_out, req.body.epigraph.title);
        const artless: Artless = new Artless(req.body.name, req.body.framework, req.body.date_in, req.body.date_out, req.body.description, epigraph);

        this.write(artless);

        return res.json(artless);
    }

    public async write (artless: Artless) {
        const MongoClient = require('mongodb').MongoClient;
        const client_artless = await MongoClient.connect(url_artless, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_artless = client_artless.db(database);
        const document_artless = db_artless.collection(collection);
        document_artless.insertOne(artless);

        const client_letter = await MongoClient.connect(url_letter, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_letter = client_letter.db(database);
        const document_letter = db_letter.collection(collection);
        document_letter.insertOne(artless);

        const client_recipe = await MongoClient.connect(url_recipe, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_recipe = client_recipe.db(database);
        const document_recipe = db_recipe.collection(collection);
        document_recipe.insertOne(artless);
   
    }

    public async getAll(req: Request, res: Response) {

        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_artless, {
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
        const client = await MongoClient.connect(url_artless, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'name': parameter }).toArray();

        return res.json(all);
    }

    public async postRange(req: Request, res: Response) {
        const in_date: Array<String> = req.body.date_in.split('/');
        const date_in: Date = new Date(in_date[2] + '-' + in_date[1] + '-' + in_date[0]);
        const out_date: Array<String> = req.body.date_out.split('/');
        const date_out: Date = new Date(out_date[2] + '-' + out_date[1] + '-' + out_date[0]);

        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_artless, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({
                $and: [{
                        date_in: {$gte:date_in},
                        date_out: {$lte:date_out}
                }]
        }).toArray();

        return res.json(all);
    }

}

export const History = new MasterHitory();