import { ICarts as IWishList } from "@/interfaces/carts.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  wishListInfo: IWishList[];
} = {
  wishListInfo: [],
};

const wishListInfoSlice = createSlice({
  name: "WishListsInfo",
  initialState,
  reducers: {
    addWishList: (state, action) => {
      const WishList = action.payload;
      const exist = state?.wishListInfo?.find((x) => x?.id === WishList?.id);
      if (exist) {
        state.wishListInfo = state.wishListInfo.map((x) =>
          x?.id === exist?.id ? WishList : x
        );
      } else {
        if (state.wishListInfo.length === 0) {
          state.wishListInfo = [WishList];
        } else {
          state.wishListInfo = [...state.wishListInfo, WishList];
        }
        // state.wishListInfo = [...state.wishListInfo, WishList];
      }
    },
    removeWishList: (state, action) => {
      const WishList = action.payload;
      state.wishListInfo = state.wishListInfo.filter(
        (x) => x?.id !== WishList?.id
      );
    },
    clearWishList: (state) => {
      state.wishListInfo = [];
    },
    addWishListQuantity: (state, action) => {
      const WishList = action.payload;
      const exist = state.wishListInfo.find((x) => x?.id === WishList?.id);
      if (exist) {
        exist.qty += 1;
        state.wishListInfo = state.wishListInfo.map((x) =>
          x?.id === WishList?.id ? exist : x
        );
      }
    },
    subtractQuantity: (state, action) => {
      const WishList = action.payload;
      const exist = state.wishListInfo.find((x) => x?.id === WishList?.id);
      if (exist) {
        exist.qty > 1 ? (exist.qty -= 1) : (exist.qty = 1);
        state.wishListInfo = state.wishListInfo.map((x) =>
          x?.id === WishList?.id ? exist : x
        );
      }
    },
    addSelectedWishList: (state, action) => {
      const WishList = action.payload;
      const exist = state.wishListInfo.find((x) => x?.id === WishList?.id);
      if (exist) {
        exist.selected = !exist.selected;
        state.wishListInfo = state.wishListInfo.map((x) =>
          x?.id === WishList?.id ? exist : x
        );
      }
    },
    addSelectedAllWishList: (state) => {
      const selected = state.wishListInfo.every((x) => x.selected === true);
      if (selected) {
        state.wishListInfo = state.wishListInfo.map((x) => {
          x.selected = false;
          return x;
        });
      } else {
        state.wishListInfo = state.wishListInfo.map((x) => {
          x.selected = true;
          return x;
        });
      }
    },
  },

  selectors: {
    getWishLists: (state) => state?.wishListInfo,
  },
});

export default wishListInfoSlice.reducer;
export const {
  addWishList,
  removeWishList,
  clearWishList,
  addWishListQuantity,
  subtractQuantity,
  addSelectedAllWishList,
  addSelectedWishList,
} = wishListInfoSlice.actions;
export const { getWishLists } = wishListInfoSlice.selectors;
