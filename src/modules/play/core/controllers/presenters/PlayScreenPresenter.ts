import { PlayState } from "@quiz/play/core/controllers/state/PlayState";
import { Question } from "@quiz/play/core/data/Question";
import { HintActionState } from "@quiz/play/core/controllers/state/HintActionState";
import { SkipActionState } from "@quiz/play/core/controllers/state/SkipActionState";
import { Alternative } from "../../data/Alternative";

export interface PlayScreenPresenter {
    setHintCallback(callback: (state: HintActionState) => void): void
    setSkipCallback(callback: (state: SkipActionState) => void): void
    setQuestionCallback(callback: (question: Question) => void): void
    setTimerCallback(callback: (value: number) => void): void
    setPlayStateCallback(callback: (state: PlayState) => void): void
    answer(alternative: Alternative): Promise<void>
    getHint(): Promise<void>
    start(): Promise<void>
    finish(): Promise<void>
    getNextQuestion(): Promise<void>
    skipQuestion(): Promise<void>
}