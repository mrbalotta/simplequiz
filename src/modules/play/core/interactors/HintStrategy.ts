import { Question } from "@quiz/play/core/data/Question";

export interface HintStrategy {
    getQuestionWithHint(): Promise<Question>
}