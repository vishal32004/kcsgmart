// store/index.ts
import { Store } from "@/types/store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createCartSlice } from "./cart-slice";
import { createUserSlice } from "./user-slice";
import { createWishlistSlice } from "./wishlist-slice";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createFilterProductSlice } from "./filter-slice";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => {
          const cartSlice = createCartSlice(...a);
          const userSlice = createUserSlice(...a);
          const wishlistSlice = createWishlistSlice(...a);
          const filterSlice = createFilterProductSlice(...a);
          return {
            ...cartSlice,
            ...userSlice,
            ...wishlistSlice,
            ...filterSlice
          };
        })
      ),
      {
        name: "store",

        partialize: (state) => ({
          products: state.products,
          total: state.total,
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          wishlist: state.wishlist,
        }),

      }
    )
  )
);

