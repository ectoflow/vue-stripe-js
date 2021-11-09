<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements }"
    stripe-key="pk_test_TYooMQauvdEDq54NiTphI7jx"
    :elements-options="elementsOpts"
  >
    <StripeElement :elements="elements" :options="elementOpts" />
  </StripeElements>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import StripeElements from '../components/StripeElements.vue'
import StripeElement from '../components/StripeElement.vue'

export default defineComponent({
  name: 'CardOnly',

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
    const stripeLoaded = ref(false)
    const elementsOpts = ref({})
    const elementOpts = ref({
      value: {},
    })

    onBeforeMount(() => {
      const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
      stripePromise.then(() => {
        stripeLoaded.value = true
      })
    })

    return {
      stripeLoaded,
      elementOpts,
      elementsOpts,
    }
  },
})
</script>
