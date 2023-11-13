import { DIContainer, DIMapper } from "@infra/di/api";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";
import { HintStrategyImpl } from "@quiz/play/impl/interactors/HintStrategyImpl";

//tag::docs[]
export default function main(di: DIContainer & DIMapper) {
    const factory = () => { // <1>
        const repository = di.inject<QuestionRepository>("QuestionRepository") // <2>
        return new HintStrategyImpl(repository) // <3>
    }
    di.single("HintStrategy", factory) // <4>
}
//end::docs[]