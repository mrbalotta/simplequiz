export class Alternative {
    constructor(
        public readonly id: string,
        public readonly choice: string,
        public readonly correct: boolean,
        public concealed = true
    ) {}
}