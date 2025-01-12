# Upgrade guide

Upgrading your Vue Stripe.js from v1 to v2.

v2.0.0 is a major update that introduces changes in default choices due to the evolution of Stripe.js. It was designed with stability in mind, ensuring that your upgrade should be smooth and simple.

## Breaking changes

ES modules are the de facto standard. Vite is expected to drop CommonJS support in 2025. Do not upgrade if you are using "require" instead of "import."

- Added npm type module
- Removed CommonJS export

## Features

- Backward-compatible; old implementations should work seamlessly
- Payment Element is the new default
- Improved TypeScript support
- Added new examples for Payment, Card, and Express Checkout

## Upgrade

### Install new version
```bash
npm install vue-stripe-js@latest
```

Test your integration. Major upgrade is finished 🎉

## Optional changes

### Provide explicit type to StripeElement

```diff
<StripeElements>
-  <StripeElement />
+  <StripeElement type="card" />
</StripeElements>
```

### Remove slot props
Not needed thanks to provide/inject behind the hood

```diff
<StripeElements
- v-slot="{ elements, instance }"
>
  <StripeElement
+   type="card"
-   :elements="elements"
  />
</StripeElements>
```
