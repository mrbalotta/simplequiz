import "tsarch/dist/jest"
import 'jest'
import { constrainModules } from "test/utils/constrainModules"


describe('home module boundary test', () => {
    it('forbid module to module dependency not mediated by api', async () => {
        const rule = constrainModules('home')
        await expect(rule).toPassAsync()
    })
})