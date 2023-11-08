import { Question } from "@quiz/play/core/data/Question";
import { QuestionRepository } from "@quiz/play/core/interactors/QuestionRepository";

export class MockQuestionRepository implements QuestionRepository {
    private currentQuestionIndex = -1

    private questions = [{
        id: '1',
        index: 1,
        rangeTotal: 3,
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
    },{
        id: '2',
        index: 2,
        rangeTotal: 3,
        title: 'Lorem ipsum ipsum?',
        alternatives: [{
            id: "A",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
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
            correct: true,
            concealed: true
        }]
    },{
        id: '3',
        index: 3,
        rangeTotal: 3,
        title: 'Lorem ipsum deserunt?',
        alternatives: [{
            id: "A",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        },{
            id: "B",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        },{
            id: "C",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: true,
            concealed: true
        },{
            id: "D",
            choice: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            correct: false,
            concealed: true
        }]
    }]

    async getNext(): Promise<Question> {
        this.currentQuestionIndex++
        if(this.currentQuestionIndex > this.questions.length -1) this.currentQuestionIndex = 0
        return this.questions[this.currentQuestionIndex]
    }

    async getCurrent(): Promise<Question> {
        return this.questions[this.currentQuestionIndex]
    }
}