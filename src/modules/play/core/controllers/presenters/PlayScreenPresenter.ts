import { PlayScreenState } from "@quiz/play/core/controllers/state/PlayScreenState";
import { Question } from "@quiz/play/core/data/Question";

export interface PlayScreenPresenter {
    setReducer(reducer: (state: PlayScreenState) => void): void
    setQuestionCallback(callback: (question: Question) => void): void
    setTimerCallback(callback: (value: number) => void): void
    getHint(): Promise<void>
    start(): Promise<void>
    finish(): Promise<void>
    getNextQuestion(): Promise<void>
    skipQuestion(): Promise<void>
}