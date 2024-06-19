import { Sequence } from "../modules/sequence";
import { History } from "../modules/history";
import { Physical } from "../modules/physical";
import { Request, Response } from "express";

class MasterController {

    public hello_sequence(req: Request, res: Response) {
        return res.json({
            response: Sequence.hello
        });
    }

    public hello_physical(req: Request, res: Response) {
        return res.json({
            response: Physical.hello
        });
    }

    public hello_history(req: Request, res: Response) {
        return res.json({
            response: History.hello
        });
    }

    public async save_sequence(req: Request, res: Response) {
        return Sequence.save(req, res);
    }

    public async save_physical(req: Request, res: Response) {
        return Physical.save(req, res);
    }

    public async save_history(req: Request, res: Response) {
        return History.save(req, res);
    }

    public getAll_sequence(req: Request, res: Response) {
        return Sequence.getAll(req, res);
    }

    public getFramework_sequence(req: Request, res: Response) {
        return Sequence.getFramework(req, res);
    }

    public getName_sequence(req: Request, res: Response) {
        return Sequence.getName(req, res);
    }

    public getAll_physical(req: Request, res: Response) {
        return Physical.getAll(req, res);
    }

    public getFramework_physical(req: Request, res: Response) {
        return Physical.getFramework(req, res);
    }

    public getName_physical(req: Request, res: Response) {
        return Physical.getName(req, res);
    }

    public getAll_history(req: Request, res: Response) {
        return History.getAll(req, res);
    }

    public getName_history(req: Request, res: Response) {
        return History.getName(req, res);
    }

    public postRange_history(req: Request, res: Response) {
        return History.postRange(req, res);
    }

}

export const Controller = new MasterController();
