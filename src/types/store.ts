import { CartSlice } from "@/store/cart-slice";
import { FilterSlice } from "@/store/filter-slice";
import { UserSlice } from "@/store/user-slice";
import { WishlistSlice } from "@/store/wishlist-slice";

export type Store = CartSlice & UserSlice & WishlistSlice & FilterSlice;