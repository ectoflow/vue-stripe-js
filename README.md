# Vue Stripe.js

Flexible and powerful Vue 3 components for Stripe. It's a glue between [Stripe.js](https://stripe.com/docs/js) and Vue component lifecycle.

- Vue 3: stable ✅
- Vue 2: use [vue-stripe-elements](https://github.com/ectoflow/vue-stripe-elements)

# Quickstart

### 1. Install package:

```bash
# npm
npm i vue-stripe-js --save-dev

# yarn
yarn add vue-stripe-js --dev
```

### 2. Load Stripe.js library:

```ts
import { loadStripe } from '@stripe/stripe-js'
import { defineComponent, ref, onBeforeMount } from 'vue'

export default defineComponent({
  // ...
  setup() {
    onBeforeMount(() => {
      const stripeLoaded = ref(false)
      const stripePromise = loadStripe('your_key')
      stripePromise.then(() => {
        stripeLoaded.value = true
      })
    })
  },
})
```

> Alternatively, you can load Stripe library by including script tag. Just make sure it's ready before your stripe components mount.

```
<script src="https://js.stripe.com/v3/"></script>
```

### 3. Use built-in components

Create card

```vue
<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements, instance }" // attention: important part!
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
    <StripeElement
      ref="card"
      :elements="elements"
      :options="cardOptions"
    />
  </StripeElements>
  <button type="button" @click="pay">Pay</button>
</template>

<script lang="ts">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { defineComponent, ref, onBeforeMount } from 'vue'

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

```

### 4. Get advanced

Create multiple elements

```vue
<StripeElements
  v-slot="{ elements }"
  :stripe-key="stripeKey"
  :instance-options="instanceOptions"
  :elements-options="elementsOptions"
>
  <StripeElement
    type="cardNumber"
    :elements="elements"
    :options="cardNumberOptions"
  />
  <StripeElement
    type="postalCode"
    :elements="elements"
    :options="postalCodeOptions"
  />
</StripeElements>
```

### 5. Get wild flexible

You can even create multiple groups, don't ask me why. It's possible.

```vue
<StripeElements
  v-slot="{ elements }"
  :stripe-key="stripeKey1"
  :instance-options="instanceOptions1"
  :elements-options="elementsOptions1"
>
  <StripeElement :elements="elements" :options="cardOptions" />
</StripeElements>
<StripeElements
  v-slot="{ elements }"
  :stripe-key="stripeKey2"
  :instance-options="instanceOptions2"
  :elements-options="elementsOptions2"
>
  <StripeElement type="iban" :elements="elements" :options="ibanOptions" />
</StripeElements>
```

# Types

```ts
import types {
  initStripe,
  createElements,
  createElement,
  StripeElements,
  StripeElement
} from 'vue-stripe-js'
```

# API Reference

## StripeElements.vue

Think of it as of individual group of elements. It creates stripe instance and elements object.

```js
import { StripeElements } from 'vue-stripe-js'
```

### props

```js
// https://stripe.com/docs/js/initializing#init_stripe_js-options
stripeKey: {
  type: String,
  required: true,
},
// https://stripe.com/docs/js/elements_object/create#stripe_elements-options
instanceOptions: {
  type: Object,
  default: () => ({}),
},
// https://stripe.com/docs/stripe.js#element-options
elementsOptions: {
  type: Object,
  default: () => ({}),
},
```

### data

You can access `instance` and `elements` by adding ref to StripeElements component.

```js
// StripeElements.vue exposes
{
  elements,
  instance,
  elementsUsable,
}
```

### default scoped slot

Elegant solution for props. Really handy because you can make stripe `instance` and `elements` objects available to all children without adding extra code.

```vue
<!-- Cool, isn't it? -->
<StripeElements v-slot="{ elements, instance }">
  <StripeElement :elements="elements" />
  <CustomComponent :instance="instance" />
</StripeElements>
```

## StripeElement.vue

Universal and type agnostic component. Create any element supported by Stripe.

```js
import { StripeElement } from 'vue-stripe-js'
```

### props

```js
{
  // elements object
  // https://stripe.com/docs/js/elements_object/create
  elements: {
    type: Object as () => StripeElementsWithoutOverload,
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
    type: Object as () => StripeElementOptions,
    default: () => ({}),
  },
},
```

### data

```js
{
  stripeElement,
  domElement,
  mountPoint,
}
```

### options

Element options are reactive. Recommendation: don't use v-model on `StripeElement`, instead pass value via options.

```js
setup() {
  const elementOptions = ref({
    value: {
      postalCode: '12345'
    }
  })
  return {
    elementOptions,
  }
},

methods: {
  changePostalCode() {
    // will update stripe element automatically
    this.elementOptions.value.postalCode = '54321'
  }
}
```

### events

Following events are emitted on StripeElement

- change
- ready
- focus
- blur
- click
- escape

```html
<StripeElement :elements="elements" @blur="doSomething" />
```

# Styles

No base style included. Main reason: overriding it isn't fun. Style as you wish via element options: [see details](https://stripe.com/docs/js/appendix/style).
