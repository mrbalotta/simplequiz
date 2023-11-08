import { Question } from "@quiz/play/core/data/Question";

export interface QuestionRepository {
    getNext(): Promise<Question>
    getCurrent(): Promise<Question>
}