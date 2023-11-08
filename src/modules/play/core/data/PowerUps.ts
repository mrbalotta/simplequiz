export class PowerUps {
    constructor(
        public readonly skipCount: number,
        public readonly hintCount: number
    ) {}

    setSkipCount(count: number): PowerUps {
        return new PowerUps(count, this.hintCount)
    }

    setHitCount(count: number): PowerUps {
        return new PowerUps(this.skipCount, count)
    }

    decrementSkipCount(): PowerUps {
        return this.setSkipCount(this.skipCount - 1)
    }
    decrementHintCount(): PowerUps {
        return this.setHitCount(this.hintCount - 1)
    }
}