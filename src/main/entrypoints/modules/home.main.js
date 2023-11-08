import * as providers from '@quiz/home/main'
import {initializer} from "@infra/initialization/initializer"

export default function main(di) {
    console.log("\thome entrypoint initializing...")
    initializer(di, providers)
    console.log("\thome entrypoint initialized")
}