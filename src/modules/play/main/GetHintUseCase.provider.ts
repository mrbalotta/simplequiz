import { DIContainer, DIMapper } from "@infra/di/api";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";
import { GetHintUseCaseImpl } from "@quiz/play/impl/interactors/GetHintUseCaseImpl";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const questionRepository = di.inject<QuestionRepository>("QuestionRepository")
        return new GetHintUseCaseImpl(questionRepository)
    }
    di.single("GetHintUseCase", factory)
}