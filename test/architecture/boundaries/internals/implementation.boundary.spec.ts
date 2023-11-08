import "tsarch/dist/jest"
import 'jest'
import { constrainImplementations } from "test/utils/constrainImplementations"
import { DependOnFileCondition } from "tsarch"
import { forbidDependency } from "test/utils/forbidDependency"


describe('implementation boundary test', () => {

    const checkRules = async (rules: DependOnFileCondition[]) => {
        for(const rule in rules) {
            await expect(rules[rule]).toPassAsync()
        }
    }

    it('interactors should be self-contained', async () => {
        const rules = constrainImplementations('interactors')
        await checkRules(rules)
    })

    it('controllers should be self-contained', async () => {
        const rules = constrainImplementations('controllers')
        await checkRules(rules)
    })

    it('view should be self-contained', async () => {
        const rules = constrainImplementations('view')
        await checkRules(rules)
    })

    it('impl should not depend on main', async () => {
        const rule = forbidDependency('/modules/[a-z]+/impl', '/modules/[a-z]+/main')
        await expect(rule).toPassAsync()
    })
})