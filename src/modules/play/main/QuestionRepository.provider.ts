import { DIContainer, DIMapper } from "@infra/di/api";
import { MockQuestionRepository } from "@quiz/play/impl/interactors/MockQuestionRepository";

export default function main(di: DIContainer & DIMapper) {
    console.log("\t\tQuestionRepository provider")
    di.single("QuestionRepository", () => new MockQuestionRepository())
}