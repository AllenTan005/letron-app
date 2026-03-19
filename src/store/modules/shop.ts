import type { Module } from "vuex";

import { products } from "@/data/products";
import type { CartItem, CartLineItem, Product } from "@/types/shop";

import type { RootState } from "../types";

export interface ShopState {
  products: Product[];
  cartItems: CartItem[];
  dialogProductId: number | null;
}

interface QuantityPayload {
  productId: number;
  quantity: number;
}

const buildCartLines = (state: ShopState): CartLineItem[] =>
  state.cartItems
    .map((item) => {
      const product = state.products.find(
        (candidate) => candidate.id === item.productId
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean) as CartLineItem[];

export const shop: Module<ShopState, RootState> = {
  namespaced: true,
  state: () => ({
    products,
    cartItems: [],
    dialogProductId: null,
  }),
  getters: {
    productList(state): Product[] {
      return state.products;
    },
    cartItemsDetailed(state): CartLineItem[] {
      return buildCartLines(state);
    },
    cartCount(state): number {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartTotal(_state, getters): number {
      return getters.cartItemsDetailed.reduce(
        (sum: number, item: CartLineItem) => sum + item.lineTotal,
        0
      );
    },
    dialogProduct(state): Product | null {
      if (state.dialogProductId === null) {
        return null;
      }

      return (
        state.products.find(
          (product) => product.id === state.dialogProductId
        ) || null
      );
    },
    isDialogOpen(state): boolean {
      return state.dialogProductId !== null;
    },
  },
  mutations: {
    OPEN_ADD_TO_CART_DIALOG(state, productId: number) {
      state.dialogProductId = productId;
    },
    CLOSE_ADD_TO_CART_DIALOG(state) {
      state.dialogProductId = null;
    },
    ADD_TO_CART(state, payload: QuantityPayload) {
      const existingItem = state.cartItems.find(
        (item) => item.productId === payload.productId
      );

      if (existingItem) {
        existingItem.quantity += payload.quantity;
        return;
      }

      state.cartItems.push({
        productId: payload.productId,
        quantity: payload.quantity,
      });
    },
    UPDATE_CART_ITEM_QUANTITY(state, payload: QuantityPayload) {
      const targetItem = state.cartItems.find(
        (item) => item.productId === payload.productId
      );

      if (!targetItem) {
        return;
      }

      if (payload.quantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== payload.productId
        );
        return;
      }

      targetItem.quantity = payload.quantity;
    },
    REMOVE_CART_ITEM(state, productId: number) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
  },
  actions: {
    openAddToCartDialog({ commit }, productId: number) {
      commit("OPEN_ADD_TO_CART_DIALOG", productId);
    },
    closeAddToCartDialog({ commit }) {
      commit("CLOSE_ADD_TO_CART_DIALOG");
    },
    addToCart({ commit }, payload: QuantityPayload) {
      commit("ADD_TO_CART", payload);
      commit("CLOSE_ADD_TO_CART_DIALOG");
    },
    updateCartQuantity({ commit }, payload: QuantityPayload) {
      commit("UPDATE_CART_ITEM_QUANTITY", payload);
    },
    removeCartItem({ commit }, productId: number) {
      commit("REMOVE_CART_ITEM", productId);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },
};
