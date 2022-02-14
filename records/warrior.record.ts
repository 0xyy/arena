import { v4 as uuid } from "uuid"
import { WarriorData } from "../types/warrior";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    id: string;
    readonly name: string;
    wins = 0;
    fights = 0;
    power: number;
    defense: number;
    durability: number;
    agility: number;

    constructor(data: WarriorData) {
        this.name = data.name;
        this.power = data.power;
        this.defense = data.defense;
        this.durability = data.durability;
        this.agility = data.agility;
        this.validate();
    }

    private validate() {
        if (!this.name || this.name.length < 3 || this.name.length > 20) {
            throw new ValidationError('Coś poszło nie tak z imieniem...');
        }

        const sum = [this.power, this.defense, this.agility, this.durability].reduce((prev, curr) => prev + curr, 0);
        if (sum !== 10) {
            throw new ValidationError('Punkty są nie zgodne');
        }
    }

     static async findByName(name: string): Promise<boolean> {
        const [data] = await pool.execute("SELECT * from `warrior` WHERE `name` = :name", {
           name,
        }) as WarriorRecordResult;

        return !!data.length;
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

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [[data]] = await pool.execute("SELECT * FROM `warrior` WHERE `id` = :id;", {
            id,
        }) as WarriorRecordResult;

        return data ? new WarriorRecord(data) : null;
    }
}