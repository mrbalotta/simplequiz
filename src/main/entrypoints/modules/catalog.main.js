import * as providers from '@quiz/catalog/main'
import {initializer} from "@infra/initialization/initializer"

export default function main(di) {
    console.log("\tcatalog entrypoint initializing...")
    initializer(di, providers)
    console.log("\tcatalog entrypoint initialized")
}
