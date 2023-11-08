import "tsarch/dist/jest"
import 'jest'
import { forbidDependency } from "test/utils/forbidDependency"


describe('clean architecture data rule test', () => {
    it('data should not depend on controllers', async () => {
        const rule = forbidDependency('data', 'controllers')
        await expect(rule).toPassAsync()
    })

    it('data should not depend on interactors', async () => {
        const rule = forbidDependency('data', 'interactors')
        await expect(rule).toPassAsync()
    })

    it('data should not depend on view', async () => {
        const rule = forbidDependency('data', 'view')
        await expect(rule).toPassAsync()
    })
})