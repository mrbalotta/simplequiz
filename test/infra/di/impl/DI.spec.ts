import { mockFn } from 'jest-mock-extended';
import { DIProxy } from './DI.proxy';
import "jest";
import { DI, DIFactory, SingleFactory } from '@infra/di/impl/DI';
import { AmbiguousMappingException, TokenNotMappedException } from '@infra/di/api';


describe("DI test", () => {

    let proxy: DIProxy
    let mappedFactory: typeof mockFn
    const token = "TOKEN"

    beforeEach(() => {
        proxy = new DIProxy()
        mappedFactory = mockFn()
    })

    const checkAmbigousException = (token: string) => {
        const toBeExecuted = () => proxy.single(token, mappedFactory)
        expect(toBeExecuted).toThrow(AmbiguousMappingException)
    }

    const checkTokenNotMappedException = (token: string) => {
        const toBeExecuted = () => proxy.inject(token)
        expect(toBeExecuted).toThrow(TokenNotMappedException)
    }

    const expectTokenToExist = (token: string) => {
        const map = proxy.getMap()
        expect(map.has(token)).toBeTruthy()
    }

    describe('when dependency is mapped as single', () => { 
        test('given token does not exist, then dependency map must contain a token to factory mapping', () => {
            //when
            proxy.single(token, mappedFactory)

            //then
            expectTokenToExist(token)
            expect(proxy.getMap().get(token)).toBeInstanceOf(SingleFactory)
        })

        test('given token DOES exist and override is not allowed, then must throw exception', () => {
            proxy.single(token, mappedFactory)
            checkAmbigousException(token)
        })
    })

    describe('when dependency is mapped as factory', () => {     
        test('given token does not exist, then dependency map must contain a token to factory mapping', () => {
            //when
            proxy.factory(token, mappedFactory)

            //then
            expectTokenToExist(token)
            expect(proxy.getMap().get(token)).toBeInstanceOf(DIFactory)
        })

        test('given token DOES exist and override is not allowed, then must throw exception', () => {
            //given
            proxy.factory(token, mappedFactory, false)
            
            //when and then
            checkAmbigousException(token)
        })
    })

    describe('when inject', () => {

        test('given token NOT mapped, then must throw exception', () => {
            checkTokenNotMappedException(token)
        })

        describe('given factory is mapped as single', () => {

            test('and mapped factory does not return immutable, then must return same object', () => {
                //given
                const mappedFactory = () => { return {} }
                proxy.single(token, mappedFactory)
    
                //when
                const first = proxy.inject(token)
                const second = proxy.inject(token)
    
                //then
                expect(first === second).toBeTruthy()
            })

            test('then mapped factory must be called once', () => {
                //given
                proxy.single(token, mappedFactory)
    
                //when
                proxy.inject(token)
                proxy.inject(token)
    
                //then
                expect(mappedFactory).toHaveBeenCalledTimes(1)
            })

            test('given override is allowed and factory is mapped twice, then must execute last mapped', () => {
                //given
                const firstFactory = mockFn()
                const secondFactory = mockFn()
                proxy.single(token, firstFactory, true)
                proxy.single(token, secondFactory)

                //when
                proxy.inject(token)
    
                //then
                expect(secondFactory).toHaveBeenCalledTimes(1)
                expect(firstFactory).toHaveBeenCalledTimes(0)
            })

        })

        
        describe('given factory is mapped as factory', () => {
            
            test('and mapped factory does not return immutable, then must return different objects', () => {
                //given
                const mappedFactory = () => { return {} }
                proxy.factory(token, mappedFactory)
    
                //when
                const first = proxy.inject(token)
                const second = proxy.inject(token)
    
                //then
                expect(first !== second).toBeTruthy()
            })

            test('given override is allowed and factory is mapped twice, then must execute last mapped', () => {
                //given
                const firstFactory = mockFn()
                const secondFactory = mockFn()
                proxy.factory(token, firstFactory, true)
                proxy.factory(token, secondFactory)

                //when
                proxy.inject(token)
    
                //then
                expect(secondFactory).toHaveBeenCalledTimes(1)
                expect(firstFactory).toHaveBeenCalledTimes(0)
            })
        })
    })
})