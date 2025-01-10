<template>
  <div ref="mountPoint"></div>
</template>

<script setup lang="ts">
import type { StripeElementType, StripeElements } from "@stripe/stripe-js"
import type { Ref } from "vue"
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue"
import type { StripeElementOptions } from "../stripe-elements"
import { createElement } from "../stripe-elements"

const props = defineProps<{
  type?: StripeElementType
  elements?: StripeElements
  options?: StripeElementOptions
}>()
const emit = defineEmits(eventTypes)
const { type, elements, options } = toRefs(props)

// Backward-compatibility: used when no type is provided. Having elements at this stage means it comes from slot props.
const fallbackType = computed(() => (elements.value ? "card" : "payment"))

// This dependency is provided by StripeElements.vue
const providedElements = inject("providedElements") as Ref<StripeElements>

const domElement = ref(document.createElement("div"))
const stripeElement = ref<ReturnType<typeof createElement>>()
const mountPoint = ref<HTMLDivElement>()

onMounted(() => {
  const mountElement = () => {
    stripeElement.value = createElement(
      elements.value || providedElements.value,
      type.value || fallbackType.value,
      options.value,
    )
    mountPoint.value?.appendChild(domElement.value)
    stripeElement.value?.mount(domElement.value)
  }

  const handleEvents = () => {
    // Define the interface for the type with the "on" method
    interface StripeElementWithOn {
      on(eventType: string, handler: (e: Event) => void): void
    }

    // Type guard function to check if an object has the "on" method
    function hasOnMethod(obj: unknown): obj is StripeElementWithOn {
      return !!obj && typeof (obj as StripeElementWithOn).on === "function"
    }

    if (stripeElement.value && hasOnMethod(stripeElement.value)) {
      // See stripe element events: https://stripe.com/docs/js/element/events
      for (const eventType of eventTypes) {
        stripeElement.value.on(eventType, (e: Event) => {
          emit(eventType, e)
        })
      }
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
  if (options.value && stripeElement.value && "update" in stripeElement.value) {
    // biome-ignore lint/suspicious/noExplicitAny: update option ts overload is too specific
    stripeElement.value.update(options.value as any)
  }
})

defineExpose({
  stripeElement,
  domElement,
  mountPoint,
})
</script>

<script lang="ts">
export const eventTypes = [
  "change",
  "ready",
  "focus",
  "blur",
  "click",
  "escape",
  "loaderror",
  "loaderstart",
]
</script>
