import { DIContainer, DIMapper } from "@infra/di/api";
import { AwardingStrategyImpl } from "@quiz/play/impl/interactors/AwardingStrategyImpl";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const playSessionRepository = di.inject<PlaySessionRepository>("PlaySessionRepository")
        return new AwardingStrategyImpl(playSessionRepository)
    }
    di.single("AwardingStrategy", factory)
}