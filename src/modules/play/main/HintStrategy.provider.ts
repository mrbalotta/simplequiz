import { DIContainer, DIMapper } from "@infra/di/api";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";
import { HintStrategyImpl } from "@quiz/play/impl/interactors/HintStrategyImpl";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const questionRepository = di.inject<QuestionRepository>("QuestionRepository")
        return new HintStrategyImpl(questionRepository)
    }
    di.single("HintStrategy", factory)
}