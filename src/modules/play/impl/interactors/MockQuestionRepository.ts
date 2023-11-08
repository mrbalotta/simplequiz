import { Question } from "@quiz/play/core/data/Question";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";

export class MockQuestionRepository implements QuestionRepository {
    private currentQuestionIndex = 0

    private questions = [{
        id: '1',
        index: 1,
        rangeTotal: 10,
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, magni repudiandae. Vitae voluptatem sed dignissimos quisquam deserunt?',
        alternatives: [{
            id: "A",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: true,
            concealed: true
        },{
            id: "B",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        },{
            id: "C",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        },{
            id: "D",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        }]
    }]

    async getNext(): Promise<Question> {
        return this.questions[0]
    }

    async getCurrent(): Promise<Question> {
        return this.questions[0]
    }
}