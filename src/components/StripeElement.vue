<template>
  <div ref="mountPoint"></div>
</template>

<script setup lang="ts">
import type { StripeElementType, StripeElements } from "@stripe/stripe-js"
import {
  defineEmits,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
  withDefaults,
} from "vue"
import { createElement } from "../stripe-elements"
import type { StripeElementOptions } from "../stripe-elements"

interface Props {
  type?: StripeElementType
  elements?: StripeElements
  options?: StripeElementOptions
}

const props = withDefaults(defineProps<Props>(), {
  type: () =>
    (inject("providedElements") as StripeElementType) ? "payment" : "card",
  elements: () => inject("providedElements") as StripeElements,
})
const { type, elements, options } = toRefs(props)

// TODO: verify it works
const emit = defineEmits()

const domElement = ref(document.createElement("div"))
const stripeElement = ref()
const mountPoint = ref()

onMounted(() => {
  const mountElement = () => {
    stripeElement.value = createElement(
      elements.value,
      type.value,
      options.value,
    )
    mountPoint.value.appendChild(domElement.value)
    stripeElement.value?.mount(domElement.value)
  }

  // Handle event listeners
  const wrapperFn = (t: string, e: Event) => {
    emit(t, e)
  }

  const handleEvents = () => {
    // See stripe element events: https://stripe.com/docs/js/element/events
    const eventTypes = [
      "change",
      "ready",
      "focus",
      "blur",
      "click",
      "escape",
      "loaderror",
      "loaderstart",
    ]

    for (const eventType of eventTypes) {
      stripeElement.value?.on(eventType, wrapperFn.bind(null, eventType))
    }
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

watch(options, () => {
  stripeElement.value?.update(props.options)
})

defineExpose({
  stripeElement,
  domElement,
  mountPoint,
})
</script>
