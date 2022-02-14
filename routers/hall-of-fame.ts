import { Router } from "express";

export const hallOfFameRouter = Router();

hallOfFameRouter

    .get('/', (req, res) => {
       res.send('Sala sław');
    });