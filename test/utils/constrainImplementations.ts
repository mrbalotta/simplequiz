import { DependOnFileCondition, filesOfProject } from "tsarch"

export function constrainImplementations(layer: string): DependOnFileCondition[] {
    const layers = ['controllers', 'interactors', 'view', 'data']

    return layers
            .filter((currentLayer) => layer !== currentLayer)
            .map((foreignLayer) => {
                return filesOfProject()
                        .matchingPattern(`impl/${layer}`)
                        .shouldNot()
                        .dependOnFiles()
                        .matchingPattern(`impl/${foreignLayer}`)
            })
}