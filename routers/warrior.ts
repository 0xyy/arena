import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";

export const warriorRouter = Router();

// /warrior
warriorRouter

    .post('/', async (req, res) => {

        try {
            const data = req.body;

            const newWarrior = new WarriorRecord(data);
            await newWarrior.insert();

            res.json(req.body.name);
        } catch (err) {
            res.render('error', {
                message: err,
            })
        }
    })

    .get('/form', (req, res) => {
        res.render('warrior/warrior-form');
    })