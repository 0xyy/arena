import { v4 as uuid } from "uuid"
import { FieldPacket } from "mysql2";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    public wins?: number;
    public fights?: number;
    public readonly name: string;
    public readonly power: number;
    public readonly defense: number;
    public readonly durability: number;
    public readonly agility: number;

    constructor(data: Omit<WarriorRecord, 'validate' | 'insert' | 'update'>) {
        const {id, name, durability, defense, power, agility, wins, fights} = data;

        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.fights = fights ?? 0;
        this.name = name;
        this.power = power;
        this.defense = defense;
        this.durability = durability;
        this.agility = agility;
        this.validate();
    }

    private validate(): void {
        const stats = [this.power, this.defense, this.agility, this.durability];

        const sum = stats.reduce((prev, curr) => prev + curr, 0);

        for (const stat of stats) {
            if (stat < 0) {
                throw new ValidationError('Każda statystyka powinna wynosić min. 1');
            }
        }

        if (sum !== 10) {
            throw new ValidationError(`Punkty są nie zgodne. Suma powinna wynosić 10 a wynosi ${sum}.`);
        }

        if (!this.name || this.name.length < 3 || this.name.length > 20) {
            throw new ValidationError(`Imię powinno mieć od 3 do 20 znaków. Aktualnie jest to ${this.name.length}.`);
        }
    }

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `warriors` VALUES(:id, :name, :power, :defense, :durability, :agility, :wins, :fights);", {
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

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins, `fights` = :fights WHERE `id` = :id;", {
            id: this.id,
            wins: this.wins,
            fights: this.fights,
        });
    }

    static async findByName(name: string): Promise<boolean> {
        const [data] = await pool.execute("SELECT * from `warriors` WHERE `name` = :name", {
            name,
        }) as WarriorRecordResult;

        return !!data.length;
    }

    static async getAll(): Promise<WarriorRecord[]> {
        const [data] = await pool.execute("SELECT * FROM `warriors`;") as WarriorRecordResult;
        return data.map(data => new WarriorRecord(data));
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [[data]] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id;", {
            id,
        }) as WarriorRecordResult;

        return data ? new WarriorRecord(data) : null;
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [data] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount;", {
            topCount,
        }) as WarriorRecordResult;

        return data;
    }
}