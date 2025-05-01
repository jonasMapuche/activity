import { Seminar } from "../models/seminar";
import { request, Request, Response } from "express";
const url_seminar = "mongodb+srv://labrouste:freedown@clusterseminar.jezhscg.mongodb.net/?retryWrites=true&w=majority&appName=clusterseminar";
const url_adverb = "mongodb+srv://labrouste:freedown@clusteradverb.twimpt2.mongodb.net/?retryWrites=true&w=majority&appName=clusteradverb";
const url_sentence = "mongodb+srv://labrouste:freedown@clustersentence.n5y9bze.mongodb.net/?retryWrites=true&w=majority&appName=clustersentence";
const database = "stomach";
const collection = "seminar";

class MasterSeminar {

    public hello: string = 'seminar project';

    public async save(req: Request, res: Response) {
        const seminar: Seminar = req.body;
        this.write(seminar);

        return res.json(seminar);
    }

    public async write (list: Seminar) {
        const MongoClient = require('mongodb').MongoClient;
        const client_seminar = await MongoClient.connect(url_seminar, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_seminar = client_seminar.db(database);
        const document_seminar = db_seminar.collection(collection);
        document_seminar.insertOne(list);

        const client_adverb = await MongoClient.connect(url_adverb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_adverb = client_adverb.db(database);
        const document_adverb = db_adverb.collection(collection);
        document_adverb.insertOne(list);

        const client_sentence = await MongoClient.connect(url_sentence, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db_sentence = client_sentence.db(database);
        const document_sentence = db_sentence.collection(collection);
        document_sentence.insertOne(list);
    }

    public async getAll(req: Request, res: Response) {

        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(url_sentence, {
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
        const client = await MongoClient.connect(url_sentence, {
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
        const client = await MongoClient.connect(url_sentence, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(database);
        const document = db.collection(collection);
        const all = await document.find({ 'name': parameter }).toArray();

        return res.json(all);
    }
    
}

export const Lesson = new MasterSeminar();