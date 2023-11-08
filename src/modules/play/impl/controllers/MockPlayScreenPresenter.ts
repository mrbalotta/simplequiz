import { PlayScreenPresenter } from "@quiz/play/core/controllers/presenters/PlayScreenPresenter";
import { PlayScreenState } from "@quiz/play/core/controllers/state/PlayScreenState";
import { Question } from "@quiz/play/core/data/Question";
import { GetHintUseCase } from "@quiz/play/core/interactors/GetHintUseCase";
import { PlaySessionRepository } from "@quiz/play/core/interactors/PlaySessionRepository";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";

export class MockPlayScreenPresenter implements PlayScreenPresenter {
    private questionCallback: ((question: Question) => void) | null = null
    private timerCallback: ((value: number) => void) | null = null
    private reducer: ((state: PlayScreenState) => void) | null = null
    private executing = false

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly playSessionRepository: PlaySessionRepository,
        private readonly getHintUsecase: GetHintUseCase
    ) {}
    
    setReducer(reducer: (state: PlayScreenState) => void): void {
        this.reducer = reducer
    }

    setQuestionCallback(callback: (question: Question) => void): void {
        this.questionCallback = callback
    }

    setTimerCallback(callback: (value: number) => void): void {
        this.timerCallback = callback
    }

    async getHint(): Promise<void> {
        if(!this.executing) {
            try {
                this.executing = true
                this.questionCallback?.(await this.getHintUsecase.getQuestionWithHint())
                const powerups = await this.playSessionRepository.decrementHintCount()
                this.reducer?.(new PlayScreenState(powerups.hintCount, powerups.skipCount))
            } 
            catch(e) {}
            finally {
                this.executing = false
            }
        }
    }

    async start(): Promise<void> {
        this.getNextQuestion()
        this.startPowerUps()
    }

    async finish(): Promise<void> {
        this.reducer = null
        this.questionCallback = null
        this.timerCallback = null
    }

    async getNextQuestion(): Promise<void> {
        const question = await this.questionRepository.getNext()
        this.questionCallback?.(question)
    }

    private async startPowerUps() {
        const powerups = await this.playSessionRepository.getPowerUps()
        this.reducer?.(new PlayScreenState(powerups.hintCount, powerups.skipCount, 0, 0, false))
    }

    async skipQuestion(): Promise<void> {
        if(!this.executing) {
            this.executing = true
            const powerups = await this.playSessionRepository.decrementSkipCount()
            this.reducer?.(new PlayScreenState(powerups.hintCount, powerups.skipCount))
            this.executing = false
        }
    }
}