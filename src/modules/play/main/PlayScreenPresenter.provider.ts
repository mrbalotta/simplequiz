import { DIContainer, DIMapper } from "@infra/di/api";
import { MockPlayScreenPresenter } from "@quiz/play/impl/controllers/MockPlayScreenPresenter";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";
import { GetHintUseCase } from "@quiz/play/core/interactors/GetHintUseCase";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const questionRepository = di.inject<QuestionRepository>("QuestionRepository")
        const playSessionRepository = di.inject<PlaySessionRepository>("PlaySessionRepository")
        const getHintUseCase = di.inject<GetHintUseCase>("GetHintUseCase")
        return new MockPlayScreenPresenter(questionRepository, playSessionRepository, getHintUseCase)
    }
    
    di.single("PlayScreenPresenter", factory)
}