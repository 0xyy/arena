import { Router } from "express";
import { WarriorRecord } from "../records/warrior.record";
import { ValidationError } from "../utils/errors";

export const warriorRouter = Router();

// /warrior
warriorRouter

    .post('/', async (req, res) => {
        const {
            name,
            power,
            defense,
            durability,
            agility
        }: {
            name: string,
            power: string,
            defense: string,
            durability: string,
            agility: string
        } = req.body;

        if (await WarriorRecord.findByName(name)) {
            throw new ValidationError('Takie imię wojownika już istnieje!');
        }

        const newWarrior = new WarriorRecord({
            name,
            power: Number(power),
            defense: Number(defense),
            durability: Number(durability),
            agility: Number(agility),
        });
        await newWarrior.insert();

        res.render('warrior/warrior-created', {
            newWarrior,
        });
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