import { PlayScreenPresenter } from "@quiz/play/core/controllers/presenters/PlayScreenPresenter";
import { HintActionState } from "@quiz/play/core/controllers/state/HintActionState";
import { PlayState } from "@quiz/play/core/controllers/state/PlayState";
import { SkipActionState } from "@quiz/play/core/controllers/state/SkipActionState";
import { Alternative } from "@quiz/play/core/data/Alternative";
import { Question } from "@quiz/play/core/data/Question";
import { AwardingStrategy } from "@quiz/play/core/interactors/AwardingStrategy";
import { HintStrategy } from "@quiz/play/core/interactors/HintStrategy";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";

export class MockPlayScreenPresenter implements PlayScreenPresenter {
    private questionCallback: ((question: Question) => void) | null = null
    private timerCallback: ((value: number) => void) | null = null
    private hintCallback: ((state: HintActionState) => void) | null = null
    private skipCallback: ((state: SkipActionState) => void) | null = null
    private playCallback: ((state: PlayState) => void) | null = null
    private hintExecuting = false
    private skipExecuting = false

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly playSessionRepository: PlaySessionRepository,
        private readonly hintStrategy: HintStrategy,
        private readonly awardingStrategy: AwardingStrategy
    ) {}

    setPlayStateCallback(callback: (state: PlayState) => void): void {
        this.playCallback = callback
    }

    setHintCallback(callback: (state: HintActionState) => void): void {
        this.hintCallback = callback
    }

    setSkipCallback(callback: (state: SkipActionState) => void): void {
        this.skipCallback = callback
    }

    setQuestionCallback(callback: (question: Question) => void): void {
        this.questionCallback = callback
    }

    setTimerCallback(callback: (value: number) => void): void {
        this.timerCallback = callback
    }

    async answer(alternative: Alternative): Promise<void> {
        const awards = (alternative.correct)? await this.awardingStrategy.calculate(alternative) : await this.playSessionRepository.getAwards()
        this.playCallback?.(new PlayState(awards.coins, awards.xp, !alternative.correct))
    }

    async getHint(): Promise<void> {
        if(!this.hintExecuting) {
            this.hintExecuting = true
            try {
                this.questionCallback?.(await this.hintStrategy.getQuestionWithHint())
                const powerups = await this.playSessionRepository.decrementHintCount()
                this.hintCallback?.(new HintActionState(powerups.hintCount))
            } 
            catch(e) {}
            finally {
                setTimeout(() => this.hintExecuting = false, 1000)
            }
        }
    }

    async start(): Promise<void> {
        this.getNextQuestion()
        this.startPowerUps()
        this.playCallback?.(new PlayState())
    }

    async finish(): Promise<void> {
        this.hintCallback = null
        this.skipCallback = null
        this.questionCallback = null
        this.timerCallback = null
        this.playCallback = null
    }

    async getNextQuestion(): Promise<void> {
        const question = await this.questionRepository.getNext()
        const powerups = await this.playSessionRepository.getPowerUps()
        this.questionCallback?.(question)
        this.skipCallback?.(new SkipActionState(powerups.skipCount, question.index == question.rangeTotal))
    }

    private async startPowerUps() {
        const powerups = await this.playSessionRepository.getPowerUps()
        this.hintCallback?.(new HintActionState(powerups.hintCount))
        this.skipCallback?.(new SkipActionState(powerups.skipCount))
    }

    async skipQuestion(): Promise<void> {
        if(!this.skipExecuting) {
            try {
                this.skipExecuting = true
                const powerups = await this.playSessionRepository.decrementSkipCount()
                this.getNextQuestion()
            } catch(e) {}
            finally {
                setTimeout(() => this.skipExecuting = false, 1000)
            }      
        }
    }
}