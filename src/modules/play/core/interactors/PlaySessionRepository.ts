import { PowerUps } from "@quiz/play/core/data/Powerups";
import { Awards } from "@quiz/play/core/data/Awards";

export interface PlaySessionRepository {
    getPowerUps(): Promise<PowerUps>
    getAwards(): Promise<Awards>
    decrementSkipCount(): Promise<PowerUps>
    decrementHintCount(): Promise<PowerUps>
    updatePowerUps(powerups: PowerUps): Promise<void>
    updateAwards(awards: Awards): Promise<void>
}