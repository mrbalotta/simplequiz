import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('clean architecture interactors rule test', () => {
    it('interactors should not depend on controllers', async () => {
        const rule = forbidDependency('interactors', 'controllers')
        await expect(rule).toPassAsync()
    })

    it('interactors should not depend on view', async () => {
        const rule = forbidDependency('interactors', 'view')
        await expect(rule).toPassAsync()
    })
})