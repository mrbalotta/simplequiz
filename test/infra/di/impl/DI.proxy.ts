import { DIContainer, DIMapper } from "@infra/di/api";
import { DI } from "@infra/di/impl/DI";

export class DIProxy extends DI implements DIContainer, DIMapper {
    
    constructor() {
        super()
    }

    single<T>(token: string, factory: () => T, allowOverride?: boolean | undefined): DIMapper {
        return super.single(token, factory, allowOverride)
    }

    factory<T>(token: string, factory: () => T, allowOverride?: boolean | undefined): DIMapper {
        return super.factory(token, factory, allowOverride)
    }

    inject<T>(token: string): T {
        return super.inject(token)
    }

    getMap() {
        return this.map
    }
}