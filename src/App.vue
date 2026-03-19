<script lang="ts">
import Vue from "vue";

import AddToCartDialog from "@/components/AddToCartDialog.vue";
import { formatCurrency } from "@/utils/currency";

export default Vue.extend({
  name: "App",
  components: {
    AddToCartDialog,
  },
  computed: {
    cartCount(): number {
      return this.$store.getters["shop/cartCount"];
    },
    cartTotal(): number {
      return this.$store.getters["shop/cartTotal"];
    },
  },
  methods: {
    formatCurrency,
  },
});
</script>

<template>
  <div id="app" class="app-shell">
    <header class="app-header">
      <router-link class="app-brand" to="/">
        <strong class="app-brand__title">Letron Menu</strong>
      </router-link>

      <nav class="app-nav" aria-label="Main navigation">
        <router-link exact to="/">商品列表</router-link>
        <router-link class="app-nav__cart" to="/cart">
          購物車
          <span class="app-nav__badge">{{ cartCount }}</span>
        </router-link>
      </nav>

      <div class="app-summary">
        <span class="app-summary__label">目前總額</span>
        <strong>{{ formatCurrency(cartTotal) }}</strong>
      </div>
    </header>

    <main class="app-content">
      <router-view />
    </main>

    <add-to-cart-dialog />
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  padding: 1.5rem 0 2rem;
}

.app-brand {
  display: inline-flex;
  flex-direction: column;
  gap: 0.2rem;
  color: inherit;
  text-decoration: none;
}

.app-brand__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-text);
}

.app-brand__title {
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  letter-spacing: -0.04em;
}

.app-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.app-nav a {
  padding: 0.7rem 1rem;
  border-radius: 999px;
  color: var(--muted-text);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.app-nav a:hover {
  color: var(--text-color);
  transform: translateY(-1px);
}

.app-nav a.router-link-exact-active {
  background: var(--panel-strong);
  color: var(--surface);
}

.app-nav__cart {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.app-nav__badge {
  display: inline-grid;
  min-width: 1.7rem;
  min-height: 1.7rem;
  place-items: center;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.78rem;
}

.app-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  color: var(--text-color);
}

.app-summary__label {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted-text);
}

.app-content {
  padding-bottom: 3rem;
}

@media (max-width: 720px) {
  .app-header {
    align-items: stretch;
  }

  .app-nav,
  .app-summary {
    width: 100%;
  }

  .app-summary {
    align-items: flex-start;
  }
}
</style>
