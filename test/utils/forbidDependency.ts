import {DependOnFileCondition, filesOfProject} from "tsarch"

export function forbidDependency(fromLayer: string, toLayer: string): DependOnFileCondition {    
    return filesOfProject()
                .matchingPattern(fromLayer)
                .shouldNot()
                .dependOnFiles()
                .matchingPattern(toLayer)
}