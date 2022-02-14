import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";

export const warriorRouter = Router();

// /warrior
warriorRouter

    .post('/', async (req, res) => {
        const data = req.body;
        console.log(data);
        // const newWarrior = new WarriorRecord(data);
        // await newWarrior.insert();
        //
        // res.json(req.body.name);
    })

    .get('/select', async (req, res) => {
        const warriors = await WarriorRecord.getAll();
        res.render('warrior/warrior-select',{
            warriors: warriors.length > 1 ? warriors : false,
        });
    })

    .get('/form', (req, res) => {
        res.render('warrior/warrior-form');
    });