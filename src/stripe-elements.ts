import type {
  Stripe,
  // Element options
  StripeAddressElementOptions,
  StripeAffirmMessageElementOptions,
  StripeAfterpayClearpayMessageElementOptions,
  StripeAuBankAccountElementOptions,
  StripeCardCvcElementOptions,
  StripeCardElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeConstructorOptions,
  StripeElement,
  StripeElementType,
  StripeElements,
  StripeElementsOptions,
  StripeElementsOptionsClientSecret,
  StripeElementsOptionsMode,
  StripeEpsBankElementOptions,
  StripeExpressCheckoutElementOptions,
  StripeFpxBankElementOptions,
  StripeIbanElementOptions,
  StripeIdealBankElementOptions,
  StripeIssuingCardCopyButtonElementOptions,
  StripeIssuingCardCvcDisplayElementOptions,
  StripeIssuingCardExpiryDisplayElementOptions,
  StripeIssuingCardNumberDisplayElementOptions,
  StripeIssuingCardPinDisplayElementOptions,
  StripeP24BankElementOptions,
  StripePaymentElementOptions,
  StripePaymentMethodMessagingElementOptions,
  StripePaymentRequestButtonElementOptions,
  StripeShippingAddressElementOptions,
} from "@stripe/stripe-js"

export type StripeElementOptions =
  | StripeAddressElementOptions
  | StripeAffirmMessageElementOptions
  | StripeAfterpayClearpayMessageElementOptions
  | StripeAuBankAccountElementOptions
  | StripeCardElementOptions
  | StripeCardNumberElementOptions
  | StripeCardExpiryElementOptions
  | StripeCardCvcElementOptions
  | StripeEpsBankElementOptions
  | StripeFpxBankElementOptions
  | StripeIbanElementOptions
  | StripeIdealBankElementOptions
  | StripeP24BankElementOptions
  | StripeExpressCheckoutElementOptions
  | StripePaymentElementOptions
  | StripePaymentMethodMessagingElementOptions
  | StripePaymentRequestButtonElementOptions
  | StripeIssuingCardNumberDisplayElementOptions
  | StripeIssuingCardCvcDisplayElementOptions
  | StripeIssuingCardExpiryDisplayElementOptions
  | StripeIssuingCardPinDisplayElementOptions
  | StripeIssuingCardCopyButtonElementOptions
  | StripeShippingAddressElementOptions

/* type StripeElementOptionsMap = {
  address: StripeAddressElementOptions
  affirmMessage: StripeAffirmMessageElementOptions
  afterpayClearpayMessage: StripeAfterpayClearpayMessageElementOptions
  auBankAccount: StripeAuBankAccountElementOptions
  card: StripeCardElementOptions
  cardNumber: StripeCardNumberElementOptions
  cardExpiry: StripeCardExpiryElementOptions
  cardCvc: StripeCardCvcElementOptions
  currencySelector: undefined
  epsBank: StripeEpsBankElementOptions
  expressCheckout: StripeExpressCheckoutElementOptions
  fpxBank: StripeFpxBankElementOptions
  iban: StripeIbanElementOptions
  idealBank: StripeIdealBankElementOptions
  p24Bank: StripeP24BankElementOptions
  payment: StripePaymentElementOptions
  paymentMethodMessaging: StripePaymentMethodMessagingElementOptions
  paymentRequestButton: StripePaymentRequestButtonElementOptions
  linkAuthentication: undefined
  shippingAddress: StripeShippingAddressElementOptions
  issuingCardNumberDisplay: StripeIssuingCardNumberDisplayElementOptions
  issuingCardCvcDisplay: StripeIssuingCardCvcDisplayElementOptions
  issuingCardExpiryDisplay: StripeIssuingCardExpiryDisplayElementOptions
  issuingCardPinDisplay: StripeIssuingCardPinDisplayElementOptions
  issuingCardCopyButton: StripeIssuingCardCopyButtonElementOptions
} */

export const ERRORS = {
  STRIPE_NOT_LOADED: "Stripe script is not loaded",
  INSTANCE_NOT_DEFINED:
    "Instance object is not defined. Initialize Stripe before creating elements",
  ELEMENTS_NOT_DEFINED:
    "Elements object is not defined. You can't create stripe element without it",
  ELEMENT_TYPE_NOT_DEFINED:
    "elementType is required. You can't create stripe element without it",
}

export const initStripe = (
  publishableKey: string,
  options?: StripeConstructorOptions,
): Stripe | undefined => {
  try {
    if (!window.Stripe) {
      throw new Error(ERRORS.STRIPE_NOT_LOADED)
    }
    const stripeInstance: Stripe = window.Stripe(publishableKey, options)
    return stripeInstance
  } catch (error) {
    console.error(error)
  }
}

export const createElements = (
  instance?: Stripe,
  options?: StripeElementsOptions,
) => {
  try {
    if (!instance) {
      throw new Error(ERRORS.INSTANCE_NOT_DEFINED)
    }
    // Fix overload issue #ts2769
    return options?.clientSecret
      ? instance.elements(options as StripeElementsOptionsClientSecret)
      : instance.elements(options as StripeElementsOptionsMode)
  } catch (error) {
    console.error(error)
  }
}

export const createElement = (
  elements: StripeElements,
  elementType: StripeElementType,
  options?: StripeElementOptions,
): StripeElement | undefined => {
  try {
    if (!elements) {
      throw new Error(ERRORS.ELEMENTS_NOT_DEFINED)
    }
    if (!elementType) {
      throw new Error(ERRORS.ELEMENT_TYPE_NOT_DEFINED)
    }
    return elements.create(elementType as any, options as any)
  } catch (error) {
    console.error(error)
  }
}
