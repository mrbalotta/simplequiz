import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('clean architecture controllers rule test', () => {
    it('controllers should not depend on views', async () => {
        const rule = forbidDependency('controllers', 'view')
        await expect(rule).toPassAsync()
    })
})