import { Router } from "express";
import {WarriorRecord} from "../records/warrior.record";

export const hallOfFameRouter = Router();

hallOfFameRouter

    .get('/', async (req, res) => {
       const list = await WarriorRecord.listTop(10);

       res.render('hall-of-fame/list', {
           list: list.length > 1 ? list : false,
       });
    });