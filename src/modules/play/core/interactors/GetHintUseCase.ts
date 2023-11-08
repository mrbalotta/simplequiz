import { Question } from "@quiz/play/core/data/Question";

export interface GetHintUseCase {
    getQuestionWithHint(): Promise<Question>
}