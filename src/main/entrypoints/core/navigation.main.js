import * as providers from '@infra/navigation/main'
import {initializer} from "@infra/initialization/initializer"

export default function main(di) {
    initializer(di, providers)
    console.log("\tnavigation entrypoint initialized")
}