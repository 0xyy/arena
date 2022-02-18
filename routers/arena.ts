import { Router } from "express";
import { ValidationError } from "../utils/errors";
import { WarriorRecord } from "../records/warrior.record";
import { Arena } from "../lib/arena";

export const arenaRouter = Router();

arenaRouter

    .post('/', async (req, res) => {
        const { warrior1: warrior1Id, warrior2: warrior2Id }: {
            warrior1: string,
            warrior2: string,
        } = req.body;

        if (warrior1Id === warrior2Id) {
            throw new ValidationError('Nie możesz walczyć z tym samym wojownikiem. Wybierz innego!');
        }

        const warrior1 = await WarriorRecord.getOne(warrior1Id);
        const warrior2 = await WarriorRecord.getOne(warrior2Id);

        if (!warrior1 || !warrior2) {
            throw new ValidationError('Jeden z wojowników się zgubił podczas drogi na arenę.');
        }

        const arena = new Arena(warrior1, warrior2);
        let winner = null;

        do {
            console.log('info');
            winner = arena.fight();
        } while (winner === null)

        res.render('arena/arena', {
            // log walki
        });
    })

