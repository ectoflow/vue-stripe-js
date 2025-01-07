<template>
  <StripeElements
    v-if="stripeLoaded"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
    ref="elms"
    class="py-3"
  >
    <StripeElement
      type="card"
      :options="cardOptions"
      ref="card"
    />
  </StripeElements>
  <button
    type="button"
    @click="pay"
    class="w-full rounded-b bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-500"
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
    const instanceOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    })
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    })
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
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
      instanceOptions,
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
