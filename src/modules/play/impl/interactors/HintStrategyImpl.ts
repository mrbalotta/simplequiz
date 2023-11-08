import { Alternative } from "@quiz/play/core/data/Alternative";
import { Question } from "@quiz/play/core/data/Question";
import { HintStrategy } from "@quiz/play/core/interactors/HintStrategy";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";

export class HintStrategyImpl implements HintStrategy {
    
    private hintsPerQuestionCounter: Map<string, number> = new Map()

    constructor(private readonly questionRepository: QuestionRepository) {}

    async getQuestionWithHint(): Promise<Question> {
        const currentQuestion = await this.questionRepository.getCurrent()
        let count = this.hintsPerQuestionCounter.get(currentQuestion.id) ?? 0
        
        if(count >= 2) throw new Error("max hints per question")
        
        this.hintsPerQuestionCounter.set(currentQuestion.id, ++count)
        const alternatives = [...currentQuestion.alternatives]
        this.shuffle(alternatives).find((alternative) => {
            if(alternative.correct == false && alternative.concealed == true) {
                alternative.concealed = false
                return alternative
            }
        })

        return currentQuestion
    }

    private shuffle(array: Alternative[]) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
}