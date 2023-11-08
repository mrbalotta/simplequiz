import { DependOnFileCondition, filesOfProject } from "tsarch";

export function constrainWithin(layer: string, exclusions: string[]): DependOnFileCondition[] {
    return exclusions.map((exclusion) => {
        return filesOfProject()
                .matchingPattern(layer)
                .shouldNot()
                .dependOnFiles()
                .matchingPattern(exclusion)
    })
    
}