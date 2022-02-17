import {WarriorRecord} from "../records/warrior.record";
import {ActiveWarrior} from "../types/active-warrior";
import {WarriorDataStats} from "../types/warrior";

export class Arena {
    private activeWarrior: ActiveWarrior = ActiveWarrior.Second;
    private w1: WarriorDataStats;
    private w2: WarriorDataStats;

    constructor(
        private readonly warrior1: WarriorRecord,
        private readonly warrior2: WarriorRecord,
    ) {
        this.activeWarrior = 2;
        this.w1 = {
            power: this.warrior1.power,
            defense: this.warrior1.defense,
            durability: this.warrior1.durability,
            agility: this.warrior1.agility,
        }

        this.w2 = {
            power: this.warrior2.power,
            defense: this.warrior2.defense,
            durability: this.warrior2.durability,
            agility: this.warrior2.agility,
        }
    }

    // private addNumberOfFights(): void {
    //     this.warrior1.fights++;
    //     this.warrior2.fights++;
    // }
    //
    // private setWarriorsHp(): void {
    //     this.warrior1Hp = this.warrior1.durability * 10;
    //     this.warrior2Hp = this.warrior2.durability * 10;
    // }
    //
    // private setWarriorsShield(): void {
    //     this.warrior1Shield = this.warrior1.defense;
    //     this.warrior2Shield = this.warrior2.defense;
    // }

    public fight() {
        const attacker = this.activeWarrior === ActiveWarrior.First ? this.w1 : this.w2;
        const attacked = this.activeWarrior === ActiveWarrior.First ? this.w2 : this.w1;

        const attackingHitPoints = attacker.power;
        const attackedOldHp = attacked.durability * 10;

        if (attacked.defense + attacked.agility > attackingHitPoints) {
            attacked.defense = attacked.defense - attackingHitPoints;
        }

    }

    public init() {
        // this.addNumberOfFights();
        // this.setWarriorsHp();
        // this.setWarriorsShield();
    }
}