import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoriteSliceType } from "./favoritesSlice";
import { createNotificactionSlice, type NotificationSliceType } from "./notificationSlice";
import { createAISlice, type AISliceType } from "./aiSlice";


export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificactionSlice(...a),
    ...createAISlice(...a),
})));