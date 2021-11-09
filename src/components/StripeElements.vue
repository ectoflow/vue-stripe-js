<template>
  <div v-if="elementsUsable">
    <slot :instance="instance" :elements="elements"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from 'vue'
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
    const instance = ref()
    const elements = ref()
    const elementsUsable = computed(() => {
      return elements.value ? Object.keys(elements.value).length > 0 : false
    })

    onMounted(() => {
      const { stripeKey, instanceOptions, elementsOptions } = props
      instance.value = initStripe(stripeKey, instanceOptions)
      elements.value = createElements(instance.value, elementsOptions)
    })

    watch(props.elementsOptions, () => {
      elements.value?.update(props.elementsOptions)
    })

    return {
      elements,
      instance,
      elementsUsable,
    }
  },
})
</script>
