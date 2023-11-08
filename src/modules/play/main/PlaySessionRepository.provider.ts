import { DIContainer, DIMapper } from "@infra/di/api";
import { MockPlaySessionRepository } from "@quiz/play/impl/interactors/MockPlaySessionRepository";

export default function(di: DIContainer & DIMapper) {
    di.single("PlaySessionRepository", () => new MockPlaySessionRepository())
}