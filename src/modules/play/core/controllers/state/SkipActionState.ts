export class SkipActionState {
    constructor(
        public readonly count: number = 0,
        public readonly disabled: boolean = false
    ) {}
}