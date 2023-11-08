import { Awards } from "@quiz/play/core/data/Awards";
import { PowerUps } from "@quiz/play/core/data/PowerUps";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";

export class MockPlaySessionRepository implements PlaySessionRepository {

    private awards = new Awards()
    private powerups = new PowerUps(5, 4)

    async getPowerUps(): Promise<PowerUps> {
        return this.powerups
    }

    async getAwards(): Promise<Awards> {
        return this.awards
    }

    async updatePowerUps(powerups: PowerUps): Promise<void> {
        this.powerups = powerups
    }

    async updateAwards(awards: Awards): Promise<void> {
        this.awards = awards
    }

    async decrementSkipCount(): Promise<PowerUps> {
        this.powerups = this.powerups.decrementSkipCount()
        return this.powerups
    }

    async decrementHintCount(): Promise<PowerUps> {
        this.powerups = this.powerups.decrementHintCount()
        return this.powerups
    }
}