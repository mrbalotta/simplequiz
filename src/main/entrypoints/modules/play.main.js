import { initializer } from '@infra/initialization/initializer'
import * as providers from '@quiz/play/main'

export default function main(di) {
    console.log("\tplay entrypoint initializing...")
    initializer(di, providers)
    console.log("\tplay entrypoint initialized")
}