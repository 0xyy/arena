import { v4 as uuid } from "uuid"
import { WarriorData } from "../types/warrior";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";

export class WarriorRecord {
    id: string;
    readonly name;
    wins = 0;
    fights = 0;
    power;
    defense;
    durability;
    agility;

    constructor(data: WarriorData) {
        if (!data.name || data.name.length < 3 || data.name.length > 20) {
            throw new ValidationError('Coś poszło nie tak z imieniem...');
        }

        this.name = data.name;
        this.power = data.stats.power;
        this.defense = data.stats.defense;
        this.durability = data.stats.durability;
        this.agility = data.stats.agility;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `warrior` VALUES(:id, :name, :power, :defense, :durability, :agility, :wins, :fights);", {
            id: this.id,
            name: this.name,
            power: this.power,
            defense: this.defense,
            durability: this.durability,
            agility: this.agility,
            wins: this.wins,
            fights: this.fights,
        });

        return this.id;
    }
}