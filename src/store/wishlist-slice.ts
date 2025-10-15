import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { WishlistProduct } from "@/types/product";

export interface WishlistSlice {
  wishlist: WishlistProduct[];
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const createWishlistSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  WishlistSlice
> = (set, get) => ({
  wishlist: [],

  addToWishlist: (product) => {
    const exists = get().wishlist.some((p) => p.id === product.id);
    if (!exists) {
      set((state) => {
        state.wishlist.push(product);
      });
    }
  },

  removeFromWishlist: (productId) =>
    set((state) => {
      state.wishlist = state.wishlist.filter((p) => p.id !== productId);
    }),

  isInWishlist: (productId) => get().wishlist.some((p) => p.id === productId),

  clearWishlist: () => set((state) => {
    state.wishlist = [];
  }),
});
