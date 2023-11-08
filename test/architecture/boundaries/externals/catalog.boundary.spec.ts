import "tsarch/dist/jest"
import 'jest'
import { constrainModules } from "test/utils/constrainModules"


describe('catalog module boundary test', () => {
    it('forbid module to module dependency not mediated by api', async () => {
        const rule = constrainModules('catalog')
        await expect(rule).toPassAsync()
    })
})