import { Alternative } from "@quiz/play/core/data/Alternative";
import { Awards } from "@quiz/play/core/data/Awards";

export interface AwardingStrategy {
    calculate(answer: Alternative): Promise<Awards>
}