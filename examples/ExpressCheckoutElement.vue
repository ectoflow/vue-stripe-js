<template>
  <StripeElements
    v-if="stripeLoaded"
    :stripe-key="publishableKey"
    :instance-options="stripeOptions"
    :elements-options="elementsOptions"
    ref="elementsComponent"
  >
    <StripeElement
      type="expressCheckout"
      :options="expressCheckoutOptions"
      ref="expressCheckoutComponent"
    />
  </StripeElements>
</template>

<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js"
import type {
  StripeConstructorOptions,
  StripeElementsOptions,
  StripeExpressCheckoutElement,
  StripeExpressCheckoutElementOptions,
} from "@stripe/stripe-js"
import { onBeforeMount, ref, useTemplateRef } from "vue"
import StripeElement from "../src/components/StripeElement.vue"
import StripeElements from "../src/components/StripeElements.vue"

const publishableKey = ref("pk_test_f3duw0VsAEM2TJFMtWQ90QAT") // test key
const stripeOptions = ref<StripeConstructorOptions>({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref<StripeElementsOptions>({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
  mode: "payment",
  amount: 1099,
  currency: "eur",
})
const expressCheckoutOptions = ref<StripeExpressCheckoutElementOptions>({
  // https://docs.stripe.com/js/elements_object/create_express_checkout_element#express_checkout_element_create-options
})
const stripeLoaded = ref(false)

onBeforeMount(() => {
  loadStripe(publishableKey.value).then(() => {
    stripeLoaded.value = true
  })
})

// Vue 3.5 and newer, for older vue versions use ref()
const elementsComponent = useTemplateRef("elementsComponent")
const expressCheckoutComponent = useTemplateRef("expressCheckoutComponent")

const handleSomething = () => {
  const stripeInstance = elementsComponent.value?.instance
  const expressCheckout = expressCheckoutComponent.value
    ?.stripeElement as StripeExpressCheckoutElement

  // do advanced stuff ...
}
/*
  The Express Checkout Element contains an iframe that securely sends the payment information to Stripe over an HTTPS connection. The checkout page address must also start with https://, rather than http://, for your integration to work.

  https://docs.stripe.com/elements/express-checkout-element/accept-a-payment?locale=en-GB&lang=node
*/

// To get element rendered on localhost
// 1. Use your publishableKey
// 2. Stripe says you need https
// 3. Add domains for Apple Pay, Google Pay, and Link
// 4. I tested it by enabling PayPal in Dashboard > Settings > Payments > Payment Methods
</script>
