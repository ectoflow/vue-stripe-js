<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements }"
    :stripe-key="stripeKey"
    :instance-options="stripeOptions"
    :elements-options="elementsOptions"
    ref="elms"
    class="py-3"
  >
    <StripeElement
      :elements="elements"
      :options="cardOptions"
      ref="card"
    />
  </StripeElements>
  <button
    type="button"
    @click="pay"
    class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  >
    Pay now
  </button>
</template>

<script lang="ts">
import { loadStripe } from "@stripe/stripe-js"
import { defineComponent, onBeforeMount, ref } from "vue"
import StripeElement from "../src/components/StripeElement.vue"
import StripeElements from "../src/components/StripeElements.vue"

export default defineComponent({
  name: "CardElement",

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
    const stripeKey = ref("pk_test_TYooMQauvdEDq54NiTphI7jx") // test key
    const stripeOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    })
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    })
    const cardOptions = ref({
      // https://docs.stripe.com/js/elements_object/create_element?type=card#elements_create-options
      value: {
        postalCode: "12345",
      },
    })
    const stripeLoaded = ref(false)
    const card = ref()
    const elms = ref()

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value)
      stripePromise.then(() => {
        stripeLoaded.value = true
      })
    })

    return {
      stripeKey,
      stripeLoaded,
      stripeOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
    }
  },

  methods: {
    pay() {
      /* 
        WARNING:
        legacy way to implement card payments,
        for modern card example, see CardElement.vue
      */

      // Get stripe element
      const cardElement = this.card.stripeElement

      // "instance" means Stripe Instance or Stripe object
      this.elms.instance.createToken(cardElement).then((result: object) => {
        // Handle result.error or result.token
        console.log(result)
      })
    },
  },
})
</script>
