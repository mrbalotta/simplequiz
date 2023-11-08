import { Question } from "@quiz/play/core/data/Question";

export class PlayScreenState {
    constructor(
        public readonly hintCount?: number,
        public readonly skipCount?: number,
        public readonly coins?: number,
        public readonly xp?: number,
        public readonly disabled?: boolean
    ) {}
}