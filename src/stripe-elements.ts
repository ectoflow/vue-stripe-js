import type {
  Stripe,
  StripeAddressElementOptions,
  StripeAffirmMessageElementOptions,
  StripeAfterpayClearpayMessageElementOptions,
  StripeAuBankAccountElementOptions,
  StripeCardCvcElementOptions,
  StripeCardElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeConstructorOptions,
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
  | StripeCardCvcElementOptions
  | StripeCardElementOptions
  | StripeCardExpiryElementOptions
  | StripeCardNumberElementOptions
  | StripeEpsBankElementOptions
  | StripeExpressCheckoutElementOptions
  | StripeFpxBankElementOptions
  | StripeIbanElementOptions
  | StripeIdealBankElementOptions
  | StripeIssuingCardCopyButtonElementOptions
  | StripeIssuingCardCvcDisplayElementOptions
  | StripeIssuingCardExpiryDisplayElementOptions
  | StripeIssuingCardNumberDisplayElementOptions
  | StripeIssuingCardPinDisplayElementOptions
  | StripeP24BankElementOptions
  | StripePaymentElementOptions
  | StripePaymentMethodMessagingElementOptions
  | StripePaymentRequestButtonElementOptions
  | StripeShippingAddressElementOptions

export type StripeElementOptionsMap = {
  address: StripeAddressElementOptions
  affirmMessage: StripeAffirmMessageElementOptions
  afterpayClearpayMessage: StripeAfterpayClearpayMessageElementOptions
  auBankAccount: StripeAuBankAccountElementOptions
  card: StripeCardElementOptions
  cardCvc: StripeCardCvcElementOptions
  cardExpiry: StripeCardExpiryElementOptions
  cardNumber: StripeCardNumberElementOptions
  currencySelector: undefined
  epsBank: StripeEpsBankElementOptions
  expressCheckout: StripeExpressCheckoutElementOptions
  fpxBank: StripeFpxBankElementOptions
  iban: StripeIbanElementOptions
  idealBank: StripeIdealBankElementOptions
  issuingCardCopyButton: StripeIssuingCardCopyButtonElementOptions
  issuingCardCvcDisplay: StripeIssuingCardCvcDisplayElementOptions
  issuingCardExpiryDisplay: StripeIssuingCardExpiryDisplayElementOptions
  issuingCardNumberDisplay: StripeIssuingCardNumberDisplayElementOptions
  issuingCardPinDisplay: StripeIssuingCardPinDisplayElementOptions
  linkAuthentication: undefined
  p24Bank: StripeP24BankElementOptions
  payment: StripePaymentElementOptions
  paymentMethodMessaging: StripePaymentMethodMessagingElementOptions
  paymentRequestButton: StripePaymentRequestButtonElementOptions
  shippingAddress: StripeShippingAddressElementOptions
}

export const ERRORS = {
  STRIPE_NOT_LOADED:
    "Stripe is not loaded. Include it as script or load using loadStripe method of @stripe/stripe-js",
  INSTANCE_NOT_DEFINED:
    "Stripe instance is not defined. Initialize Stripe before creating elements",
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
  options?: StripeElementOptionsMap[StripeElementType],
) => {
  try {
    if (!elements) {
      throw new Error(ERRORS.ELEMENTS_NOT_DEFINED)
    }
    if (!elementType) {
      throw new Error(ERRORS.ELEMENT_TYPE_NOT_DEFINED)
    }
    return elements.create(elementType, options)
  } catch (error) {
    console.error(error)
  }
}
