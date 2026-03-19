<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";

import type { Product } from "@/types/shop";
import { formatCurrency } from "@/utils/currency";

export default Vue.extend({
  name: "ProductCard",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  methods: {
    formatCurrency,
  },
});
</script>

<template>
  <article class="product-card">
    <div class="product-card__media">
      <img
        class="product-card__image"
        :src="product.image"
        :alt="product.title"
      />
      <button
        class="product-card__action"
        type="button"
        @click="$emit('add', product.id)"
      >
        加入購物車
      </button>
    </div>

    <div class="product-card__body">
      <div class="product-card__meta">
        <span>No. {{ product.id }}</span>
        <strong>{{ formatCurrency(product.price) }}</strong>
      </div>
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow-soft);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-pop);
}

.product-card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    135deg,
    rgba(20, 43, 83, 0.08),
    rgba(255, 138, 93, 0.16)
  );
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-card__action {
  position: absolute;
  inset: auto 1rem 1rem;
  width: calc(100% - 2rem);
  padding: 0.9rem 1rem;
  border: 0;
  border-radius: 16px;
  background: rgba(10, 18, 33, 0.9);
  color: var(--surface);
  font-weight: 600;
  opacity: 0;
  transform: translateY(12px);
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
}

.product-card__action:active{
  transform: scale(0.98);
}

.product-card__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 36%, rgba(10, 18, 33, 0.58));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.product-card:hover .product-card__media::after,
.product-card:hover .product-card__action,
.product-card:focus-within .product-card__media::after,
.product-card:focus-within .product-card__action {
  opacity: 1;
}

.product-card:hover .product-card__action,
.product-card:focus-within .product-card__action {
  transform: translateY(0);
}

.product-card__body {
  display: grid;
  gap: 0.75rem;
  padding: 1.2rem;
}

.product-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.86rem;
  color: var(--muted-text);
}

.product-card__body h2 {
  font-size: 1.2rem;
  line-height: 1.15;
}

.product-card__body p {
  color: var(--muted-text);
}
</style>
