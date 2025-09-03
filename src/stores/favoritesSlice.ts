import type { StateCreator } from "zustand";
import type { Recipe } from "../type";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { createNotificactionSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoriteSliceType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExist: (id: Recipe['idDrink']) => boolean;
    loadFromStorage: () => void;
}

export const createFavoritesSlice: StateCreator<FavoriteSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExist(recipe.idDrink)) {
            set(state => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink),
            }));
            createNotificactionSlice(set, get, api).showNotification({ text: 'Se eliminó de favoritos', error: false });
        } else {
            set(state => ({
                favorites: [...state.favorites, recipe],
            }));
            createNotificactionSlice(set, get, api).showNotification({ text: 'Se agregó a favoritos', error: false });
        }
        createRecipeSlice(set, get, api).closeModal();
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites),
            })
        }
    }
})