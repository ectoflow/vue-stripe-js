# Upgrade guide

Upgrading your vue-stripe-js from v1 to v2.

Vue Stripe.js v2.0.0 is a major update that makes changes in default choices due to Stripe.js evolution. It was designed with stability in mind. Your upgrade should be smooth and simple.

## Breaking changes

ES module is the de-facto standard. Vite is expected to drop commonjs support in 2025. Don't upgrade if you use "require" instead of "import".

- added npm type module
- removed commonjs export

## Features
- Backward-compatible, old implementations should work seamlessly
- Payment Element is the new default
- Better TypeScript support
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
