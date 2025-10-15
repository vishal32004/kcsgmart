import { CartProduct } from "@/types/product";
import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incQty: (productId) =>
  set((state) => {
    const product = state.products.find((p) => p.id === Number(productId));

    if (product) {
      product.qty += 1;

      const matchedPrice = [...product.priceRange]
        .sort((a, b) => a.min_quantity - b.min_quantity)
        .reverse()
        .find((range) => product.qty >= range.min_quantity);

      if (matchedPrice) {
        product.price = +matchedPrice.p_price;
      }
    }
  }),


  decQty: (productId) =>
  set((state) => {
    const product = state.products.find((p) => p.id === Number(productId));

    if (product && product.qty > product.minQuantity) {
      product.qty -= 1;

      const matchedPrice = [...product.priceRange]
        .sort((a, b) => a.min_quantity - b.min_quantity)
        .reverse()
        .find((range) => product.qty >= range.min_quantity);

      if (matchedPrice) {
        product.price = +matchedPrice.p_price;
      }
    }
  }),


  addProduct: (product) =>
    set((state) => {
      const existingIndex = state.products.findIndex(
        (p) => p.id === product.id
      );

      if (existingIndex !== -1) {
        const existing = state.products[existingIndex];
        existing.qty += 1;

        const matched = existing.priceRange.find(
          (range) => existing.qty >= range.min_quantity
        );
        if (matched) {
          existing.price = +matched.p_price;
        }
      } else {
        const matched = product.priceRange.find(
          (range) => product.minQuantity >= range.min_quantity
        );

        state.products.push({
          ...product,
          qty: product.minQuantity,
          price: matched ? +matched.p_price : +product.priceRange[0].p_price,
        });
      }
    }),

  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product: CartProduct) => product.id !== Number(productId)
      );
    }),
  getProductById: (productId) =>
    get().products.find(
      (product: CartProduct) => product.id === Number(productId)
    ),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => set(() => initialState),
});
