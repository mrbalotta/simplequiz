import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('api boundary test', () => {

    it('api should not depend on main', async () => {
        const rule = forbidDependency('/modules/[a-z]+/api', '/modules/[a-z]+/main')
        await expect(rule).toPassAsync()
    })

    it('api should not depend on impl', async () => {
        const rule = forbidDependency('/modules/[a-z]+/api', '/modules/[a-z]+/impl')
        await expect(rule).toPassAsync()
    })

    it('api should not depend on core', async () => {
        const rule = forbidDependency('/modules/[a-z]+/api', '/modules/[a-z]+/core')
        await expect(rule).toPassAsync()
    })
})