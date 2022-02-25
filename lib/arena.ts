import { WarriorRecord } from "../records/warrior.record";
import { ActiveWarrior } from "../types/active-warrior";
import { WarriorObj } from "../types/warrior";

export class Arena {
    private winner: WarriorRecord;
    private log: string[] = [];
    private activeWarrior: ActiveWarrior = ActiveWarrior.Second;
    private readonly warrior1Obj: WarriorObj;
    private readonly warrior2Obj: WarriorObj;

    constructor(
        private readonly warrior1: WarriorRecord,
        private readonly warrior2: WarriorRecord,
    ) {
        this.activeWarrior = 2;
        this.warrior1Obj = {
            hp: this.warrior1.durability * 10,
            dp: this.warrior1.defense,
            warrior: this.warrior1,
        }

        this.warrior2Obj = {
            hp: this.warrior2.durability * 10,
            dp: this.warrior2.defense,
            warrior: this.warrior2,
        }
    }

    public fight(): {
        log: string[],
        winner: WarriorRecord,
    } {
        const attacker = this.activeWarrior === ActiveWarrior.First ? this.warrior1Obj : this.warrior2Obj;
        const defender = this.activeWarrior === ActiveWarrior.First ? this.warrior2Obj : this.warrior1Obj;

        do {
            const attackingHitPoints = attacker.warrior.power;

            this.log.push(`${attacker.warrior.name} rozdaje prawego sierpa dla ${defender.warrior.name} z siłą ${attackingHitPoints} 🗡`);

            if (defender.dp + defender.warrior.agility > attackingHitPoints) {
                this.log.push(`${defender.warrior.name} próbuje się bronić przed ${attacker.warrior.name} 🛡`);

                defender.dp -= attackingHitPoints;

                if (defender.dp < 0) {
                    this.log.push(`Mocny cios! ${attacker.warrior.name} przebił tarczę ${defender.warrior.name} dając mu bombę za ${-defender.dp} obrażeń 🗡`);
                    defender.hp += defender.dp;
                }
            } else {
                this.log.push(`Czysta Bitka! ${attacker.warrior.name} sadzi szybki lewy za ${attackingHitPoints} obrażeń dla ${defender.warrior.name} 🗡`);

                defender.hp -= attackingHitPoints;
            }

            this.activeWarrior = this.activeWarrior === ActiveWarrior.First
                ? ActiveWarrior.Second
                : ActiveWarrior.First;
        } while (defender.hp > 0)

        this.winner = attacker.warrior;
        this.log.push(`${this.winner.name} WYGRAŁ! 😎`);
        this.log.push(`${defender.warrior.name} DO GROBU! 😭`);

        return {
            log: this.log,
            winner: this.winner,
        }
    }
}