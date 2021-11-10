import type {
  Stripe,
  StripeConstructorOptions,
  StripeElementsOptions,
  StripeElements,
  StripeElementType,
} from '@stripe/stripe-js'

import type {
  StripeElementsWithoutOverload,
  StripeElementOptions,
} from '../types/vue-stripe'

export const ERRORS = {
  STRIPE_NOT_LOADED: 'Stripe v3 library is not loaded',
  INSTANCE_NOT_DEFINED:
    'Instance object is not defined. Make sure you initialized Stripe before creating elements',
  ELEMENTS_NOT_DEFINED:
    "Elements object is not defined. You can't create stripe element without it",
  ELEMENT_TYPE_NOT_DEFINED:
    "elementType is required. You can't create stripe element without it",
}

export const initStripe = (key: string, options?: StripeConstructorOptions) => {
  try {
    if (!window.Stripe) {
      throw new Error(ERRORS.STRIPE_NOT_LOADED)
    }
    const stripeInstance: Stripe = window.Stripe(key, options)
    return stripeInstance
  } catch (error) {
    console.error(error)
    return error
  }
}

export const createElements = (
  instance: Stripe,
  options?: StripeElementsOptions
) => {
  try {
    if (!instance) {
      throw new Error(ERRORS.INSTANCE_NOT_DEFINED)
    }
    const elements: StripeElements = instance.elements(options)
    return elements
  } catch (error) {
    console.error(error)
    return error
  }
}

export const createElement = (
  elements: StripeElementsWithoutOverload,
  elementType: StripeElementType,
  options?: StripeElementOptions
) => {
  try {
    if (!elements) {
      throw new Error(ERRORS.ELEMENTS_NOT_DEFINED)
    }
    if (!elementType) {
      throw new Error(ERRORS.ELEMENT_TYPE_NOT_DEFINED)
    }
    const element = elements.create(elementType, options)
    return element
  } catch (error) {
    console.error(error)
    return error
  }
}
