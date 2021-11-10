<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements }"
    stripe-key="pk_test_TYooMQauvdEDq54NiTphI7jx"
    :elements-options="elmsOptions"
  >
    <StripeElement :elements="elements" :options="elOptions" />
  </StripeElements>
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
    const stripeLoaded = ref(false)
    const elmsOptions = ref({})
    const elOptions = ref({
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
      elOptions,
      elmsOptions,
    }
  },
})
</script>
