import { Alternative } from "@quiz/play/core/data/Alternative";

export class Question {
    constructor(
        public readonly id: string,
        public readonly index: number,
        public readonly rangeTotal: number,
        public readonly title: string,
        public readonly alternatives: Alternative[]
    ) {}
}