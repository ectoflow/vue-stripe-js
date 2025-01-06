<template>
  <div v-if="elementsUsable">
    <slot
      :instance="instance"
      :elements="elements"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import type {
  Stripe,
  StripeConstructorOptions,
  StripeElements,
  StripeElementsOptions,
  StripeElementsUpdateOptions,
} from "@stripe/stripe-js"
import { computed, onMounted, provide, ref, toRefs, watch } from "vue"
import { createElements, initStripe } from "../stripe-elements.ts"

const props = defineProps<{
  stripeKey: string
  instanceOptions?: StripeConstructorOptions
  elementsOptions?: StripeElementsOptions
}>()

const { stripeKey, instanceOptions, elementsOptions } = toRefs(props)
const instance = ref<Stripe>()
const elements = ref<StripeElements>()
const elementsUsable = computed(() => {
  return elements.value ? Object.keys(elements.value).length > 0 : false
})

onMounted(() => {
  instance.value = initStripe(stripeKey.value, instanceOptions.value)
  elements.value = createElements(instance.value, elementsOptions.value)
})

watch(elementsOptions, () => {
  elements.value?.update(elementsOptions.value as StripeElementsUpdateOptions)
})

provide("providedInstance", instance)
provide("providedElements", elements)

defineExpose({
  elements,
  instance,
  elementsUsable,
})
</script>
