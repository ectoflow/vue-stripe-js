<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements }"
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
    <StripeElement ref="card" :elements="elements" :options="cardOptions" />
  </StripeElements>
  <button type="button" @click="pay">Pay</button>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import StripeElements from '../src/components/StripeElements.vue'
import StripeElement from '../src/components/StripeElement.vue'

export default defineComponent({
  name: 'CardOnly',

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
    const stripeKey = ref('pk_test_TYooMQauvdEDq54NiTphI7jx') // test key
    const instanceOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    })
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    })
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
      value: {
        postalCode: '12345',
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
      // Get stripe element
      const cardElement = this.card.stripeElement

      // Access instance methods, e.g. createToken()
      this.elms.instance.createToken(cardElement).then((result: object) => {
        // Handle result.error or result.token
        console.log(result)
      })
    },
  },
})
</script>
