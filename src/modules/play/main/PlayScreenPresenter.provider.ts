import { DIContainer, DIMapper } from "@infra/di/api";
import { MockPlayScreenPresenter } from "@quiz/play/impl/controllers/MockPlayScreenPresenter";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";
import { HintStrategy } from "@quiz/play/core/interactors/HintStrategy";
import { AwardingStrategy } from "@quiz/play/core/interactors/AwardingStrategy";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const questionRepository = di.inject<QuestionRepository>("QuestionRepository")
        const playSessionRepository = di.inject<PlaySessionRepository>("PlaySessionRepository")
        const hintStrategy = di.inject<HintStrategy>("HintStrategy")
        const awardingStrategy = di.inject<AwardingStrategy>("AwardingStrategy")

        return new MockPlayScreenPresenter(questionRepository, playSessionRepository, hintStrategy, awardingStrategy)
    }
    
    di.single("PlayScreenPresenter", factory)
}