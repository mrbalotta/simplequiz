import { DependOnFileCondition } from "tsarch";
import { forbidDependency } from "./forbidDependency";

export function constrainModules(module: string): DependOnFileCondition {
    return forbidDependency(`modules/${module}`, `^.*/modules/((?!(${module})|(api)).)+$`)
}