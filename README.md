# Letron Shopping Cart Demo

Vue 2 storefront assignment demo with:

- Product list page
- Cart page
- Vuex 3 cart flow
- Hover-to-add interaction
- Add-to-cart dialog with quantity input
- Editable cart quantity and auto-calculated totals

## Tech Stack

- Vue 2
- Vue Router 3
- Vuex 3
- SCSS
- Vite

## Pages

### `/`

Product list page.

- Displays `id`, `title`, `price`, `image`
- Product data comes from local mock data
- Hovering product image reveals the add-to-cart button
- Clicking the button opens the add-to-cart dialog

### `/cart`

Cart page.

- Displays selected products
- Shows unit price, quantity, and line total
- Automatically calculates total amount
- Supports quantity updates and item removal

## Vuex Design

State is centralized in `src/store/modules/shop.ts`.

- `products`: mock product catalog
- `cartItems`: selected items and quantities
- `dialogProductId`: current product opened in the add-to-cart dialog

Getters are used for:

- Product list access
- Cart count
- Cart total
- Detailed cart line items
- Dialog product lookup

Actions and mutations handle:

- Opening and closing the dialog
- Adding items to cart
- Updating quantity
- Removing items
- Clearing the cart

This keeps page components focused on UI and interaction instead of business logic.

## Project Structure

```text
src/
  components/
    AddToCartDialog.vue
    CartTable.vue
    ProductCard.vue
  data/
    products.ts
  router/
    index.ts
  store/
    index.ts
    modules/
      shop.ts
  utils/
    currency.ts
  views/
    CartView.vue
    ProductsView.vue
```

## Setup

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

## Important Note About Vue 2.6.x

This repository currently uses `Vite + @vitejs/plugin-vue2`.

That plugin only supports `Vue 2.7.x`, so this implementation stays on the Vue 2 line and Vuex 3 architecture, but not a literal `2.6.x` runtime. If the assignment must strictly pin to `Vue 2.6.x`, the bundler and plugin setup should also be changed, for example by replacing the current Vite plugin approach with a Vue 2.6-compatible toolchain.

## Delivery

You can provide this assignment as:

- a git repository URL
- a cloud drive URL containing the source code
