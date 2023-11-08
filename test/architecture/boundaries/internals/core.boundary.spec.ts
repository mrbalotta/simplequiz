import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('core boundary test', () => {

    it('core should not depend on impl', async () => {
        const rule = forbidDependency('/modules/[a-z]+/core', '/modules/[a-z]+/impl')
        await expect(rule).toPassAsync()
    })

    it('core should not depend on main', async () => {
        const rule = forbidDependency('/modules/[a-z]+/core', '/modules/[a-z]+/main')
        await expect(rule).toPassAsync()
    })
})