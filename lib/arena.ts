import { WarriorRecord } from "../records/warrior.record";
import { ActiveWarrior } from "../types/active-warrior";
import { WarriorData } from "../types/warrior";

export class Arena {
    private activeWarrior: ActiveWarrior = ActiveWarrior.Second;
    private readonly w1: WarriorData;
    private readonly w2: WarriorData;

    constructor(
        private readonly warrior1: WarriorRecord,
        private readonly warrior2: WarriorRecord,
    ) {
        this.activeWarrior = 2;
        this.w1 = {
            name: this.warrior1.name,
            power: this.warrior1.power,
            defense: this.warrior1.defense,
            durability: this.warrior1.durability * 10,
            agility: this.warrior1.agility,
        }

        this.w2 = {
            name: this.warrior2.name,
            power: this.warrior2.power,
            defense: this.warrior2.defense,
            durability: this.warrior2.durability * 10,
            agility: this.warrior2.agility,
        }
    }

    public fight() {
        console.log('HP W1', this.w1.durability)
        console.log('HP W2', this.w2.durability)
        const attacker = this.activeWarrior === ActiveWarrior.First ? this.w1 : this.w2;
        const attacked = this.activeWarrior === ActiveWarrior.First ? this.w2 : this.w1;

        const attackingHitPoints = attacker.power;
        const attackedOldHp = attacked.durability;

        let attackedNewHp = null;

        if (attacked.defense + attacked.agility > attackingHitPoints) {
            attacked.defense = attacked.defense - attackingHitPoints;
            console.log(`${attacker.name} atakuje ${attacked.name} za ${attackingHitPoints} ale on ma tarcze! ${attacked.name} ma teraz ${attacked.defense}pkt. tarczy!`);

            if (attackingHitPoints > attacked.defense) {
                attackedNewHp = attackedOldHp - (attackingHitPoints - attacked.defense);
                console.log(`Mocny cios! Przebiło tarczę! ${attacked.name} ma teraz ${attackedNewHp}pkt. życia!`);
            } else if (attackingHitPoints === attacked.defense) {
                attackedNewHp = attackedOldHp;
                console.log(`Tarcza obroniła! ${attacked.name} nie traci żadnych pkt. życia!`);
            }
        } else {
            attackedNewHp = attackedOldHp - attackingHitPoints;
            console.log(`Czysta Bitka! ${attacker.name} atakuje ${attacked.name} za ${attackingHitPoints} i ma teraz ${attackedNewHp}pkt. życia!`);
        }

        attacked.defense = attackedNewHp;

        this.activeWarrior = this.activeWarrior === ActiveWarrior.First
            ? ActiveWarrior.Second
            : ActiveWarrior.First;

        if (attackedNewHp <= 0) {
            console.log(`${attacked.name} został rozjebany!`);
            return attacker;
        }

        return null;
    }

}