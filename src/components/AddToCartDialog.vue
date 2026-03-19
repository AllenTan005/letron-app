<script lang="ts">
import Vue from "vue";

import type { Product } from "@/types/shop";
import { formatCurrency } from "@/utils/currency";

export default Vue.extend({
  name: "AddToCartDialog",
  data() {
    return {
      quantity: "1",
      errorMessage: "",
    };
  },
  computed: {
    isOpen(): boolean {
      return this.$store.getters["shop/isDialogOpen"];
    },
    product(): Product | null {
      return this.$store.getters["shop/dialogProduct"];
    },
    subtotal(): number {
      const quantity = Number(this.quantity);

      if (!this.product || !Number.isInteger(quantity) || quantity <= 0) {
        return 0;
      }

      return this.product.price * quantity;
    },
  },
  watch: {
    isOpen(next: boolean) {
      if (!next) {
        return;
      }

      this.quantity = "1";
      this.errorMessage = "";

      this.$nextTick(() => {
        const input = this.$refs.quantityInput as HTMLInputElement | undefined;

        if (input) {
          input.focus();
          input.select();
        }
      });
    },
  },
  methods: {
    formatCurrency,
    closeDialog() {
      this.$store.dispatch("shop/closeAddToCartDialog");
    },
    handleOverlayClick(event: MouseEvent) {
      if (event.target === event.currentTarget) {
        this.closeDialog();
      }
    },
    confirmAddToCart() {
      if (!this.product) {
        return;
      }

      const parsedQuantity = Number(this.quantity);

      if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
        this.errorMessage = "請輸入大於 0 的整數數量";
        return;
      }

      this.$store.dispatch("shop/addToCart", {
        productId: this.product.id,
        quantity: parsedQuantity,
      });
    },
  },
});
</script>

<template>
  <div
    v-if="isOpen && product"
    class="dialog"
    role="presentation"
    @click="handleOverlayClick"
  >
    <div
      class="dialog__panel"
      role="dialog"
      aria-modal="true"
      :aria-label="`Add ${product.title} to cart`"
    >
      <button class="dialog__close" type="button" @click="closeDialog">
        ×
      </button>

      <div class="dialog__content">
        <img class="dialog__image" :src="product.image" :alt="product.title" />

        <div class="dialog__details">
          <p class="dialog__eyebrow">加入購物車</p>
          <h2>{{ product.title }}</h2>
          <p class="dialog__description">{{ product.description }}</p>

          <dl class="dialog__pricing">
            <div>
              <dt>單價</dt>
              <dd>{{ formatCurrency(product.price) }}</dd>
            </div>
            <div>
              <dt>小計</dt>
              <dd>{{ formatCurrency(subtotal) }}</dd>
            </div>
          </dl>

          <label class="dialog__field" for="quantity">
            <span>數量</span>
            <input
              id="quantity"
              ref="quantityInput"
              v-model.trim="quantity"
              type="number"
              min="1"
              step="1"
              required
            />
          </label>

          <p v-if="errorMessage" class="dialog__error">{{ errorMessage }}</p>

          <div class="dialog__actions">
            <button class="dialog__ghost" type="button" @click="closeDialog">
              取消
            </button>
            <button
              class="dialog__confirm"
              type="button"
              @click="confirmAddToCart"
            >
              確認加入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(7, 12, 25, 0.58);
  backdrop-filter: blur(14px);
}

.dialog__panel {
  position: relative;
  width: min(880px, 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 28px;
  background: rgba(248, 244, 238, 0.96);
  box-shadow: var(--shadow-pop);
}

.dialog__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  border-radius: 999px;
  background: rgba(20, 43, 83, 0.08);
  font-size: 1.3rem;
  cursor: pointer;
}

.dialog__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
}

.dialog__image {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  border-radius: 28px 0 0 28px;
}

.dialog__details {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: 2rem;
}

.dialog__eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-text);
}

.dialog__details h2 {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1;
}

.dialog__description {
  color: var(--muted-text);
}

.dialog__pricing {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.dialog__pricing div {
  padding: 1rem;
  border-radius: 18px;
  background: rgba(20, 43, 83, 0.06);
}

.dialog__pricing dt {
  margin-bottom: 0.35rem;
  font-size: 0.82rem;
  color: var(--muted-text);
}

.dialog__pricing dd {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.dialog__field {
  display: grid;
  gap: 0.5rem;
}

.dialog__field span {
  font-size: 0.88rem;
  font-weight: 600;
}

.dialog__field input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  font: inherit;
}

.dialog__error {
  color: #a43131;
}

.dialog__actions {
  display: flex;
  gap: 0.75rem;
}

.dialog__ghost,
.dialog__confirm {
  flex: 1;
  padding: 0.95rem 1rem;
  border-radius: 16px;
  font: inherit;
  cursor: pointer;
}

.dialog__ghost {
  border: 1px solid var(--line);
  background: transparent;
}

.dialog__confirm {
  border: 0;
  background: var(--panel-strong);
  color: var(--surface);
}

@media (max-width: 720px) {
  .dialog__content {
    grid-template-columns: 1fr;
  }

  .dialog__image {
    min-height: 220px;
    border-radius: 28px 28px 0 0;
  }

  .dialog__pricing,
  .dialog__actions {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
}
</style>
