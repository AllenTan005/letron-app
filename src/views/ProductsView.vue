<script lang="ts">
import Vue from "vue";

import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/types/shop";

export default Vue.extend({
  name: "ProductsView",
  components: {
    ProductCard,
  },
  computed: {
    products(): Product[] {
      return this.$store.getters["shop/productList"];
    },
  },
  methods: {
    openAddToCartDialog(productId: number) {
      console.log("openAddToCartDialog", productId);
      this.$store.dispatch("shop/openAddToCartDialog", productId);
    },
  },
});
</script>

<template>
  <section class="products-page">
    <div class="products-page__grid">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add="openAddToCartDialog"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.products-page {
  display: grid;
  gap: 1.75rem;
}

.products-page__hero {
  display: grid;
  gap: 1rem;
  align-items: end;
  padding: 1.75rem;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: radial-gradient(
      circle at top right,
      rgba(255, 138, 93, 0.34),
      transparent 32%
    ),
    linear-gradient(135deg, rgba(20, 43, 83, 0.92), rgba(13, 22, 42, 0.88));
  color: var(--surface);
}

.products-page__eyebrow {
  margin-bottom: 0.55rem;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.products-page__hero h1 {
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.products-page__lead {
  max-width: 62ch;
  color: rgba(255, 255, 255, 0.82);
}

.products-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}
</style>
