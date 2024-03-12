import { Sequence } from "../modules/sequence";
import { History } from "../modules/history";
import { Sport } from "../modules/sport";
import { Request, Response } from "express";

class MasterController {

    public hello_sequence(req: Request, res: Response) {
        return res.json({
            response: Sequence.hello
        });
    }

    public hello_sport(req: Request, res: Response) {
        return res.json({
            response: Sport.hello
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

    public async save_sport(req: Request, res: Response) {
        return Sport.save(req, res);
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

    public getAll_sport(req: Request, res: Response) {
        return Sport.getAll(req, res);
    }

    public getFramework_sport(req: Request, res: Response) {
        return Sport.getFramework(req, res);
    }

    public getName_sport(req: Request, res: Response) {
        return Sport.getName(req, res);
    }

    public getAll_history(req: Request, res: Response) {
        return History.getAll(req, res);
    }
    
}

export const Controller = new MasterController();
