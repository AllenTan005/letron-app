export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartLineItem extends Product {
  quantity: number;
  lineTotal: number;
}
