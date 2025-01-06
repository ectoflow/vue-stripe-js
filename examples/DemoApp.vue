<template>
  <div>
    <h1>vue-stripe-js demo</h1>

    <section>
      <h2>Payment Element</h2>
      <p>Deferred flow - add guide link</p>
      <PaymentElement />
    </section>

    <section>
      <h2>Card Element</h2>
      <p></p>
      <CardElement />
    </section>

    <section>
      <h2>Card Element (Legacy)</h2>
      <p></p>
      <CardElementLegacy />
    </section>

    <section>
      <h2>Express Checkout Element</h2>
      <ExpressCheckoutElement />
    </section>
  </div>
</template>

<script setup lang="ts">
import CardElement from "./CardElement.vue"
import CardElementLegacy from "./CardElementLegacy.vue"
import ExpressCheckoutElement from "./ExpressCheckoutElement.vue"
import PaymentElement from "./PaymentElement.vue"
</script>
