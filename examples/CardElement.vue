<template>
  <form @submit.prevent="handlePay">
    <StripeElements
      v-if="stripeLoaded"
      :stripe-key="publishableKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions"
      ref="elementsComponent"
    >
      <StripeElement
        type="card"
        :options="cardOptions"
        ref="cardComponent"
      />
    </StripeElements>
    <button>Pay now</button>
  </form>
</template>

<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js"
import type {
  StripeCardElementOptions,
  StripeConstructorOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js"
import { onBeforeMount, ref, useTemplateRef } from "vue"
import StripeElement from "../src/components/StripeElement.vue"
import StripeElements from "../src/components/StripeElements.vue"

const publishableKey = ref("pk_test_TYooMQauvdEDq54NiTphI7jx") // test key
const instanceOptions = ref<StripeConstructorOptions>({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref<StripeElementsOptions>({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
const cardOptions = ref<StripeCardElementOptions>({
  // https://stripe.com/docs/stripe.js#element-options
})
const stripeLoaded = ref(false)

const elementsComponent = useTemplateRef("elementsComponent")
const cardComponent = useTemplateRef("cardComponent")

onBeforeMount(() => {
  loadStripe(publishableKey.value).then(() => {
    stripeLoaded.value = true
  })
})

function handlePay() {
  // You need to implement backend for creating PaymentIntent
  // Learn more by reading https://docs.stripe.com/payments/card-element?lang=node
  const stripeInstance = elementsComponent.value?.instance
  const card = cardComponent.value?.stripeElement

  // Let's skip to the point you got clientSecret
  const clientSecret = "i_was_created_on_server"

  stripeInstance
    ?.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    })
    .then((payload) => {
      if (payload.error) {
        console.error(payload.error)
      } else {
        console.log("Great success!")
      }
    })

  // if (payload.error) {
  //   setError(`Payment failed ${payload.error.message}`);
  //   setProcessing(false);
  // } else {
  //   setError(null);
  //   setProcessing(false);
  //   setSucceeded(true);
  // }
}
</script>
