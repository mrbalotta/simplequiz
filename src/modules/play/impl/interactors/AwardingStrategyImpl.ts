import { Alternative } from "@quiz/play/core/data/Alternative";
import { Awards } from "@quiz/play/core/data/Awards";
import { AwardingStrategy } from "@quiz/play/core/interactors/AwardingStrategy";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";

export class AwardingStrategyImpl implements AwardingStrategy {

    constructor(private playSessionRepository: PlaySessionRepository) {}

    async calculate(answer: Alternative): Promise<Awards> {
        const awards = await this.playSessionRepository.getAwards()

        if(answer.correct) {
            const newAwards = new Awards(awards.coins + 5, awards.xp)
            await this.playSessionRepository.updateAwards(newAwards)
            return newAwards
        }

        return awards
    }
}