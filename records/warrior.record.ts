import { v4 as uuid } from "uuid"
import { WarriorData } from "../types/warrior";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

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
        this.power = data.power;
        this.defense = data.defense;
        this.durability = data.durability;
        this.agility = data.agility;
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

    static async getAll(): Promise<WarriorRecord[]> {
        const [data] = await pool.execute("SELECT * FROM `warrior`;") as WarriorRecordResult;
        return data;
    }
}