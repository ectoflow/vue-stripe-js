import type { Component } from 'vue'
import type {
  Stripe,
  StripeConstructorOptions,
  StripeElementsOptions,
  StripeElement,
  StripeElements,
  StripeElementType,
  StripeElementsUpdateOptions,
  // All element options
  StripeShippingAddressElementOptions,
  StripePaymentRequestButtonElementOptions,
  StripePaymentElementOptions,
  StripeIdealBankElementOptions,
  StripeIbanElementOptions,
  StripeP24BankElementOptions,
  StripeEpsBankElementOptions,
  StripeFpxBankElementOptions,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeCardElementOptions,
  StripeAfterpayClearpayMessageElementOptions,
  StripeAffirmMessageElementOptions,
  StripeAuBankAccountElementOptions,
} from '@stripe/stripe-js'

export type StripeElementOptions =
  | StripeShippingAddressElementOptions
  | StripePaymentRequestButtonElementOptions
  | StripePaymentElementOptions
  | StripeIdealBankElementOptions
  | StripeIbanElementOptions
  | StripeP24BankElementOptions
  | StripeEpsBankElementOptions
  | StripeFpxBankElementOptions
  | StripeCardCvcElementOptions
  | StripeCardExpiryElementOptions
  | StripeCardNumberElementOptions
  | StripeCardElementOptions
  | StripeAfterpayClearpayMessageElementOptions
  | StripeAffirmMessageElementOptions
  | StripeAuBankAccountElementOptions

// This is a workaround
// Can't use StripeElements due to overload issues with StripeElementType
export type StripeElementsWithoutOverload = {
  create: (
    type: StripeElementType,
    options?: StripeElementOptions
  ) => StripeElement
  getElement: () => StripeElement | null
  update: (options: StripeElementsUpdateOptions) => void
}

export const initStripe: (
  key: string,
  options: StripeConstructorOptions
) => unknown | Stripe

export const createElements: (
  instance: Stripe,
  options?: StripeElementsOptions
) => unknown | StripeElements

export const createElement: (
  elements: StripeElements,
  elementType: StripeElementType,
  options?: StripeElementOptions
) => unknown | StripeElement

export const StripeElements: Component
export const StripeElement: Component
