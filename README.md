# Vue Stripe.js
### [**Become a sponsor** 💜](https://github.com/sponsors/softbeehive)

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ectoflow/vue-stripe-js/ci.yml?branch=main)](https://github.com/ectoflow/vue-stripe-js/actions)
[![npm](https://img.shields.io/npm/v/vue-stripe-js)](https://www.npmjs.com/package/vue-stripe-js)
[![Bundle Size](https://img.shields.io/bundlephobia/min/vue-stripe-js)](https://bundlephobia.com/result?p=vue-stripe-js)
[![npm](https://img.shields.io/npm/dm/vue-stripe-js)](https://www.npmjs.com/package/vue-stripe-js)
[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://vshymanskyy.github.io/StandWithUkraine)

Vue 3 components for Stripe. Build advanced payment integrations quickly. Easy to start, friendly DX, minimal abstractions, and full control. It's a glue between Stripe.js and Vue component lifecycle.

# Quickstart

### 1. Install

```bash
npm i vue-stripe-js @stripe/stripe-js
```

### 2. Load Stripe.js

```vue
<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js"
import { onBeforeMount, ref } from "vue"
import type { Stripe } from "@stripe/stripe-js"

const publishableKey = ref('')
const stripe = ref<Stripe | null>(null)

onBeforeMount(async() => {
  stripe.value = await loadStripe(publishableKey.value)
})
</script>
```

Alternatively, include a script tag. Make sure Stripe.js is loaded before you mount vue components.

```html
<script src="https://js.stripe.com/v3/"></script>
```

### 3. Payment Element

This example is based on – [deferred payment guide](https://docs.stripe.com/payments/accept-a-payment-deferred?type=payment)
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <StripeElements
      v-if="stripeLoaded"
      :stripe-key="stripeKey"
      :instance-options="stripeOptions"
      :elements-options="elementsOptions"
      ref="elementsComponent"
    >
      <StripeElement
        type="payment"
        :options="paymentElementOptions"
        ref="paymentComponent"
      />
    </StripeElements>
    <button
      type="submit"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import StripeElements from "vue-stripe-js"
import StripeElement from "vue-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { onBeforeMount, ref, useTemplateRef } from "vue"

import type {
  StripeElementsOptionsMode,
  StripePaymentElementOptions,
} from "@stripe/stripe-js"

const stripeKey = ref("pk_test_f3duw0VsAEM2TJFMtWQ90QAT")
const stripeOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref<StripeElementsOptionsMode>({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
  mode: "payment",
  amount: 1099,
  currency: "eur",
  appearance: {
    theme: "flat",
  },
})
const paymentElementOptions = ref<StripePaymentElementOptions>({
  // https://stripe.com/docs/stripe.js#element-options
})
const stripeLoaded = ref(false)
const clientSecret = ref("")

// Define component refs
const elementsComponent = useTemplateRef("elementsComponent")
const paymentComponent = useTemplateRef("paymentComponent")

onBeforeMount(() => {
  loadStripe(stripeKey.value).then(() => {
    stripeLoaded.value = true

    // Good place to call your backend to create PaymentIntent
    // Skipping to the point when you got client_secret

    // clientSecret.value = client_secret
  })
})

async function handleSubmit() {
  // Confirm the PaymentIntent using the details collected by the Payment Element
  const stripeInstance = elementsComponent.value?.instance
  const elements = elementsComponent.value?.elements

  if (stripeInstance) {
    const { error } = await stripeInstance.confirmPayment({
      elements,
      clientSecret: clientSecret.value,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      console.log(error)
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }
}
</script>

```

### 4. Payment element (requires backend)

1. Add server code by following
   [stripe guide](https://docs.stripe.com/payments/quickstart?lang=node)
1. Grab `clientSecret` from the payment intent
1. Pass it to `elements-options`

```vue
<template>
  <StripeElements
    ...
    :elements-options="elementsOptions"
  >
    <StripeElement
      type="payment"
      ...
    />
  </StripeElements>
<template />
```

```ts
const elementsOptions = ref({
  clientSecret: "grab_it_from_payment_intent",
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
```

#### It works!

<img width="840" alt="image" src="https://github.com/user-attachments/assets/0619f7b5-a70f-48a1-84c4-c75bf9fc6ded" />

## Events

```vue
<StripeElement @blur="doSomething" />
```
Following events are emitted on StripeElement

- change
- ready
- focus
- blur
- click
- escape
- 

## Style elements

No base style included. Main reason: overriding it isn't fun. Style as you wish
via element options: [see details](https://stripe.com/docs/js/appendix/style).
