<template>
  <div v-if="elementsUsable">
    <slot :instance="instance" :elements="elements"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, onMounted, watch } from 'vue'
import { createElements, initStripe } from '../stripe-elements'

export default defineComponent({
  name: 'StripeElements',

  props: {
    stripeKey: {
      type: String,
      required: true,
    },
    instanceOptions: {
      type: Object,
      default: () => ({}),
    },
    elementsOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const { stripeKey, instanceOptions, elementsOptions } = toRefs(props)
    const instance = ref()
    const elements = ref()
    const elementsUsable = computed(() => {
      return elements.value ? Object.keys(elements.value).length > 0 : false
    })

    onMounted(() => {
      instance.value = initStripe(stripeKey.value, instanceOptions.value)
      elements.value = createElements(instance.value, elementsOptions.value)
    })

    watch(elementsOptions, () => {
      elements.value?.update(elementsOptions.value)
    })

    return {
      elements,
      instance,
      elementsUsable,
    }
  },
})
</script>
