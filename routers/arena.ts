import { Router } from "express";
import { ValidationError} from "../utils/errors";

export const arenaRouter = Router();

arenaRouter

    .get('/', (req, res) => {
        res.send('arena')
    })

