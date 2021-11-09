const ERRORS = {
  STRIPE_NOT_LOADED: 'Stripe v3 library is not loaded',
  INSTANCE_NOT_DEFINED:
    'Instance object is not defined. Make sure you initialized Stripe before creating elements',
  ELEMENTS_NOT_DEFINED:
    "Elements object is not defined. You can't create stripe element without it",
  ELEMENT_TYPE_NOT_DEFINED:
    "elementType is required. You can't create stripe element without it",
}

import {
  Stripe,
  StripeConstructorOptions,
  StripeElementsOptions,
  StripeElement,
  StripeElementType,
  StripeElements,
} from '@stripe/stripe-js/types'

export const initStripe = (key: string, options: StripeConstructorOptions) => {
  if (!window.Stripe) {
    return console.error(ERRORS.STRIPE_NOT_LOADED)
  }

  const stripeInstance = window.Stripe(key, options)
  return stripeInstance
}

export const createElements = (
  instance: Stripe,
  options: StripeElementsOptions | undefined
) => {
  if (!instance) {
    return console.error(ERRORS.INSTANCE_NOT_DEFINED)
  }

  const elements: StripeElements = instance.elements(options)
  return elements
}

export const createElement = (
  elements: any,
  elementType: StripeElementType,
  options: object | undefined
) => {
  if (!elements) {
    return console.error(ERRORS.ELEMENTS_NOT_DEFINED)
  }
  if (!elementType) {
    return console.error(ERRORS.ELEMENT_TYPE_NOT_DEFINED)
  }

  const element: StripeElement = elements.create(elementType, options)
  return element
}
