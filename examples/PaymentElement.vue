<template>
  <form @submit.prevent="handleSubmit">
    <StripeElements
      v-if="stripeLoaded"
      :stripe-key="stripeKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions"
      ref="elementsComponent"
    >
      <StripeElement
        type="payment"
        :options="paymentElementOptions"
        ref="paymentComponent"
      />
    </StripeElements>
    <button>Submit</button>
  </form>
</template>

<script setup lang="ts">
import { type StripeElementsOptionsMode, loadStripe } from "@stripe/stripe-js"
/**
 * DEFERRED PAYMENT
 * This Payment Element example is based on
 * https://docs.stripe.com/payments/accept-a-payment-deferred?type=payment
 */
import { onBeforeMount, ref } from "vue"
import StripeElement from "../src/components/StripeElement.vue"
import StripeElements from "../src/components/StripeElements.vue"

const stripeKey = ref(
  "pk_test_51NH8GWJOvIxb7wA7NEsy1lurmkwPRypNibLx2Dhvq28h2VICCXViQ5UI85vrPDwRwitMCVQeQTEBQOFKcLhaAr7i00aEax8rAB",
)
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref<StripeElementsOptionsMode>({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
  mode: "payment",
  amount: 1099,
  currency: "eur",
})
const paymentElementOptions = ref({
  // https://stripe.com/docs/stripe.js#element-options
})
const stripeLoaded = ref(false)

// Define component refs
const elementsComponent = ref()
const paymentComponent = ref()

function handleSubmit() {}

onBeforeMount(() => {
  loadStripe(stripeKey.value).then(() => {
    stripeLoaded.value = true
  })
})
</script>
