import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('modules boundary test', () => {
    it('module should not depend on main', async () => {
        const rule = forbidDependency('src/modules/', 'src/main/')
        await expect(rule).toPassAsync()
    })
})