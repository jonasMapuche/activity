import { Seminar } from "../models/seminar";
import { request, Request, Response } from "express";
const url_seminar = "mongodb+srv://hipaciazatz:freedown@seminar.4knqhub.mongodb.net/?appName=seminar";
const url_seminar_test = "mongodb+srv://hipaciawang:freedown@seminar.l1znbq1.mongodb.net/?appName=seminar";
const url_seminar_production = "mongodb+srv://berthazatz:freedown@seminar.hqm4hmp.mongodb.net/?appName=seminar";
const database = "stomach";
const collection = "seminar";
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(url_seminar, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_test = new MongoClient(url_seminar_test, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const client_production = new MongoClient(url_seminar_production, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

class MasterSeminar {

    public hello: string = 'seminar project';

    public async save(req: Request, res: Response) {
        try {
            const seminar: Seminar = req.body;
            this.write(seminar);
            return res.json(seminar);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async write (list: Seminar) {
        try {
            await client.connect();
            const db_seminar = client.db(database);
            const document_seminar = db_seminar.collection(collection);
            document_seminar.insertOne(list);

            await client_test.connect();
            const db_adverb = client_test.db(database);
            const document_adverb = db_adverb.collection(collection);
            document_adverb.insertOne(list);

            await client_production.connect();
            const db_sentence = client_production.db(database);
            const document_sentence = db_sentence.collection(collection);
            document_sentence.insertOne(list);
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
            const all = await document.find({ 'framework': parameter }).toArray();
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

export const Lesson = new MasterSeminar();