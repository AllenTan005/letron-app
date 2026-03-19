<script lang="ts">
import Vue from "vue";

import CartTable from "@/components/CartTable.vue";
import type { CartLineItem } from "@/types/shop";
import { formatCurrency } from "@/utils/currency";

export default Vue.extend({
  name: "CartView",
  components: {
    CartTable,
  },
  computed: {
    cartItems(): CartLineItem[] {
      return this.$store.getters["shop/cartItemsDetailed"];
    },
    cartTotal(): number {
      return this.$store.getters["shop/cartTotal"];
    },
    cartCount(): number {
      return this.$store.getters["shop/cartCount"];
    },
    isEmpty(): boolean {
      return this.cartItems.length === 0;
    },
  },
  methods: {
    formatCurrency,
    updateQuantity(payload: { productId: number; quantity: number }) {
      this.$store.dispatch("shop/updateCartQuantity", payload);
    },
    removeItem(productId: number) {
      this.$store.dispatch("shop/removeCartItem", productId);
    },
    clearCart() {
      this.$store.dispatch("shop/clearCart");
    },
  },
});
</script>

<template>
  <section class="cart-page">
    <header class="cart-page__header">
      <div>
     
        <h1>購物車頁</h1>
      </div>

      <router-link class="cart-page__back" to="/">繼續逛商品</router-link>
    </header>

    <div v-if="isEmpty" class="cart-page__empty">
      <h2>目前購物車是空的</h2>
      <p>先回到商品列表，從商品圖片 hover 的按鈕開啟加入購物車流程。</p>
      <router-link to="/">前往商品列表</router-link>
    </div>

    <div v-else class="cart-page__layout">
      <cart-table
        :items="cartItems"
        @remove="removeItem"
        @update-quantity="updateQuantity"
      />

      <aside class="cart-page__summary">
        <p class="cart-page__summary-label">Order Summary</p>
        <div class="cart-page__summary-row">
          <span>商品數量</span>
          <strong>{{ cartCount }}</strong>
        </div>
        <div class="cart-page__summary-row">
          <span>總金額</span>
          <strong>{{ formatCurrency(cartTotal) }}</strong>
        </div>
        <button class="cart-page__clear" type="button" @click="clearCart">
          清空購物車
        </button>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart-page {
  display: grid;
  gap: 1.5rem;
}

.cart-page__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.cart-page__eyebrow,
.cart-page__summary-label {
  margin-bottom: 0.45rem;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-text);
}

.cart-page__header h1 {
  font-size: clamp(1.9rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}

.cart-page__back,
.cart-page__empty a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.1rem;
  border-radius: 999px;
  background: var(--panel-strong);
  color: var(--surface);
  text-decoration: none;
}

.cart-page__empty {
  display: grid;
  justify-items: start;
  gap: 0.85rem;
  padding: 2rem;
  border: 1px dashed var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
}

.cart-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 0.9fr);
  gap: 1.25rem;
  align-items: start;
}

.cart-page__summary {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-soft);
}

.cart-page__summary-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.cart-page__clear {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 0;
  border-radius: 16px;
  background: rgba(20, 43, 83, 0.1);
  color: var(--text-color);
  cursor: pointer;
}

@media (max-width: 920px) {
  .cart-page__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .cart-page__header {
    align-items: stretch;
    flex-direction: column;
  }

  .cart-page__back {
    width: 100%;
  }
}
</style>
