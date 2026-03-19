<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";

import type { CartLineItem } from "@/types/shop";
import { formatCurrency } from "@/utils/currency";

export default Vue.extend({
  name: "CartTable",
  props: {
    items: {
      type: Array as PropType<CartLineItem[]>,
      required: true,
    },
  },
  methods: {
    formatCurrency,
    emitQuantityChange(productId: number, quantity: number) {
      this.$emit("update-quantity", {
        productId,
        quantity,
      });
    },
    handleManualChange(productId: number, event: Event) {
      const target = event.target as HTMLInputElement;
      const parsedQuantity = Number(target.value);
      const safeQuantity =
        Number.isInteger(parsedQuantity) && parsedQuantity > 0
          ? parsedQuantity
          : 1;

      target.value = String(safeQuantity);
      this.emitQuantityChange(productId, safeQuantity);
    },
  },
});
</script>

<template>
  <div class="cart-table">
    <article v-for="item in items" :key="item.id" class="cart-table__row">
      <img class="cart-table__image" :src="item.image" :alt="item.title" />

      <div class="cart-table__content">
        <div class="cart-table__meta">
          <div>
            <p class="cart-table__item-id">ID {{ item.id }}</p>
            <h2>{{ item.title }}</h2>
          </div>
          <button type="button" @click="$emit('remove', item.id)">移除</button>
        </div>

        <div class="cart-table__details">
          <div>
            <span>單價</span>
            <strong>{{ formatCurrency(item.price) }}</strong>
          </div>

          <div>
            <span>數量</span>
            <div class="cart-table__quantity">
              <button
                type="button"
                @click="emitQuantityChange(item.id, item.quantity - 1)"
              >
                -
              </button>
              <input
                :value="item.quantity"
                type="number"
                min="1"
                step="1"
                @change="handleManualChange(item.id, $event)"
              />
              <button
                type="button"
                @click="emitQuantityChange(item.id, item.quantity + 1)"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <span>小計</span>
            <strong>{{ formatCurrency(item.lineTotal) }}</strong>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.cart-table {
  display: grid;
  gap: 1rem;
}

.cart-table__row {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow-soft);
}

.cart-table__image {
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
  border-radius: 18px;
}

.cart-table__content {
  display: grid;
  gap: 1rem;
}

.cart-table__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.cart-table__meta h2 {
  font-size: 1.2rem;
}

.cart-table__meta button {
  align-self: start;
  padding: 0.55rem 0.85rem;
  border: 0;
  border-radius: 999px;
  background: rgba(164, 49, 49, 0.1);
  color: #8a2f2f;
  cursor: pointer;
}

.cart-table__item-id,
.cart-table__details span {
  font-size: 0.8rem;
  color: var(--muted-text);
}

.cart-table__details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.cart-table__details div {
  display: grid;
  gap: 0.45rem;
}

.cart-table__quantity {
  display: inline-grid;
  grid-template-columns: 40px minmax(72px, auto) 40px;
  align-items: center;
  width: fit-content;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}

.cart-table__quantity button,
.cart-table__quantity input {
  height: 2.6rem;
  border: 0;
  background: transparent;
  font: inherit;
  text-align: center;
}

.cart-table__quantity button {
  cursor: pointer;
  background: rgba(20, 43, 83, 0.05);
}

@media (max-width: 820px) {
  .cart-table__row {
    grid-template-columns: 1fr;
  }

  .cart-table__details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .cart-table__meta {
    flex-direction: column;
  }

  .cart-table__meta button {
    width: fit-content;
  }
}
</style>
