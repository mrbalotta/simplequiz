import "tsarch/dist/jest"
import 'jest'
import { constrainModules } from "test/utils/constrainModules"


describe('play module boundary test', () => {
    it('forbid module to module dependency not mediated by api', async () => {
        const rule = constrainModules('play')
        await expect(rule).toPassAsync()
    })
})