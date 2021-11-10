import {
  initStripe,
  createElements,
  createElement,
  ERRORS,
} from '../../src/stripe-elements'

describe('initStripe', () => {
  test('no key, no options', () => {
    const result = initStripe()
    expect(result.message).toBe(ERRORS.STRIPE_NOT_LOADED)
  })

  test('key, no options', () => {
    const key = '12345'
    const mockFn = jest.fn()
    window.Stripe = mockFn
    initStripe(key)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(key, undefined)
  })

  test('key and options', () => {
    const key = '12345'
    const options = { c: 'd' }
    const mockFn = jest.fn()
    window.Stripe = mockFn
    initStripe(key, options)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(key, options)
  })
})

describe('createElements', () => {
  test('no arguments', () => {
    const result = createElements()
    expect(result.message).toBe(ERRORS.INSTANCE_NOT_DEFINED)
  })

  test('valid instance', () => {
    const mockFn = jest.fn()
    const instance = { elements: mockFn }
    createElements(instance)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('options passed', () => {
    const mockFn = jest.fn()
    const instance = { elements: mockFn }
    const options = { a: 'b' }
    createElements(instance, options)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(options)
  })
})

describe('createElement', () => {
  test('no arguments', () => {
    const result = createElement()
    expect(result.message).toBe(ERRORS.ELEMENTS_NOT_DEFINED)
  })

  test('valid elements, no type', () => {
    const elements = {}
    const result = createElement(elements)
    expect(result.message).toBe(ERRORS.ELEMENT_TYPE_NOT_DEFINED)
  })

  test('valid elements, valid type', () => {
    const mockFn = jest.fn()
    const elements = { create: mockFn }
    const type = 'card'
    createElement(elements, type)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('options passed', () => {
    const mockFn = jest.fn()
    const elements = { create: mockFn }
    const type = 'card'
    const options = { b: 'c' }
    createElement(elements, type, options)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(type, options)
  })
})
