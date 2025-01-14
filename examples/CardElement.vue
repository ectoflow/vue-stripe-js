<template>
  <form @submit.prevent="handlePay">
    <StripeElements
      v-if="stripeLoaded"
      class="py-3"
      :stripe-key="publishableKey"
      :instance-options="stripeOptions"
      :elements-options="elementsOptions"
      ref="elementsComponent"
    >
      <StripeElement
        type="card"
        :options="cardOptions"
        ref="cardComponent"
      />
    </StripeElements>
    <button 
      class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      Pay now
    </button>
  </form>
</template>

<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js"
import type {
  Stripe,
  StripeCardElement,
  StripeCardElementOptions,
  StripeConstructorOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js"
import { onBeforeMount, ref, useTemplateRef } from "vue"
import StripeElement from "../src/components/StripeElement.vue"
import StripeElements from "../src/components/StripeElements.vue"

const publishableKey = ref("pk_test_TYooMQauvdEDq54NiTphI7jx") // test key
const stripeOptions = ref<StripeConstructorOptions>({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref<StripeElementsOptions>({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
const cardOptions = ref<StripeCardElementOptions>({
  // https://docs.stripe.com/js/elements_object/create_element?type=card#elements_create-options
  style: {
    base: {},
    invalid: {},
  },
})
const stripeLoaded = ref(false)

// Vue 3.5 and newer, for older vue versions use ref()
const elementsComponent = useTemplateRef("elementsComponent")
const cardComponent = useTemplateRef("cardComponent")
const stripe = ref<Stripe | null>(null)

onBeforeMount(async () => {
  stripe.value = await loadStripe(publishableKey.value)
  stripeLoaded.value = true
})

function handlePay() {
  // You need to implement backend for creating PaymentIntent
  // Learn more by reading https://docs.stripe.com/payments/card-element?lang=node
  const card = cardComponent.value?.stripeElement as StripeCardElement
  // You can also access stripe instance from the component
  const stripeInstance = elementsComponent.value?.instance // same as stripe.value

  // Let's skip to the point you got clientSecret
  const clientSecret = "i_was_created_on_server"

  stripe.value
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
}
</script>
