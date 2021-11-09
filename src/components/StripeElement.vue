<template>
  <div ref="mountPoint"></div>
</template>

<script lang="ts">
import { StripeElementType, StripeElements } from '@stripe/stripe-js/types'
import { createElement } from '../stripe-elements'
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'

export default defineComponent({
  name: 'StripeElement',

  props: {
    // elements object
    // https://stripe.com/docs/js/elements_object/create
    elements: {
      type: Object as () => StripeElements,
      required: true,
    },
    // type of the element
    // https://stripe.com/docs/js/elements_object/create_element?type=card
    type: {
      type: String as () => StripeElementType,
      default: () => 'card',
    },
    // element options
    // https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const domElement = ref(document.createElement('div'))
    const stripeElement = ref()
    const mountPoint = ref()

    onMounted(() => {
      const mountElement = () => {
        const { elements, type, options } = props
        stripeElement.value = createElement(elements, type, options)
        stripeElement.value.mount(domElement.value)
        mountPoint.value.appendChild(domElement.value)
      }

      // Handle event listeners
      const wrapperFn = (t: string, e: Event) => {
        emit(t, e)
      }

      const handleEvents = () => {
        // See stripe element events: https://stripe.com/docs/js/element/events
        const eventTypes = [
          'change',
          'ready',
          'focus',
          'blur',
          'click',
          'escape',
        ]
        eventTypes.forEach((t) => {
          stripeElement.value.on(t, wrapperFn.bind(null, t))
        })
      }

      try {
        mountElement()
        handleEvents()
      } catch (error) {
        console.error(error)
      }
    })

    onBeforeUnmount(() => {
      stripeElement.value?.unmount()
      stripeElement.value?.destroy()
    })

    watch(props.options, () => {
      stripeElement.value?.update(props.options)
    })

    return {
      stripeElement,
      domElement,
      mountPoint,
    }
  },
})
</script>
