<template>
  <div class="flex flex-col gap-y-10 container p-10 max-w-2xl mx-auto">
    <h1 class="text-3xl font-semibold">Demo Vue Stripe.js</h1>
    
    <section>
      <h2 class="text-2xl font-semibold">Payment Element</h2>
      <p class="pt-1 pb-6">Deferred flow -
        <a
          class="text-blue-700 hover:underline"
          href="https://docs.stripe.com/payments/accept-a-payment-deferred?type=payment"
        >read stripe guide</a>
      </p>
      <PaymentElementDeferred />
    </section>

    <hr class="border-gray-300">

    <section>
      <h2 class="text-2xl font-semibold">Card Element</h2>
      <p class="pt-1 pb-4">More recent example. Stripe recommends using Payment Element instead of the Card - 
        <a
          class="text-blue-700 hover:underline"
          href="https://docs.stripe.com/payments/card-element?lang=node"
        >read stripe guide</a>
      </p>
      <CardElement />
    </section>

    <hr class="border-gray-300">

    <section>
      <h2 class="text-2xl font-semibold">Card Element (Legacy)</h2>
      <p class="pt-1 pb-4">How we implemented card payments a few years ago.</p>
      <CardElementLegacy />
    </section>

    <hr class="border-gray-300">
    
    <section>
      <h2 class="text-2xl font-semibold">Express Checkout Element</h2>
      <p class="pt-1 pb-4">Use your publishable key and enable relevant payment methods, e.g. PayPal - 
        <a
          class="text-blue-700 hover:underline"
          href="https://docs.stripe.com/elements/express-checkout-element/accept-a-payment?lang=node"
        >read stripe guide</a>
      </p>
      <ExpressCheckoutElement />
    </section>

    <section>
      <h2 class="text-2xl font-semibold">Built with</h2>
      <a class="text-blue-700 hover:underline"
      href="https://github.com/ectoflow/vue-stripe-js">https://github.com/ectoflow/vue-stripe-js</a>
    </section>
  </div>
</template>

<script setup lang="ts">
import CardElement from "./CardElement.vue"
import CardElementLegacy from "./CardElementLegacy.vue"
import ExpressCheckoutElement from "./ExpressCheckoutElement.vue"
import PaymentElementDeferred from "./PaymentElementDeferred.vue"
</script>
