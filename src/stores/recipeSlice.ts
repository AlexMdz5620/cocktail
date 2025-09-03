import type { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../type";
import type { FavoriteSliceType } from "./favoritesSlice";

export type RecipeSliceType = {
    categories: Categories;
    drinks: Drinks;
    selectedRecipe: Recipe;
    modal: boolean;
    fetchCategories: () => Promise<void>;
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>;
    selectRecipe: (id: Drink['idDrink']) => Promise<void>;
    closeModal: () => void;
}

export const createRecipeSlice: StateCreator<RecipeSliceType & FavoriteSliceType, [], [], RecipeSliceType> = (set) => ({
    categories: {
        drinks: [],
    },
    drinks: {
        drinks: [],
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories
        });
    },
    searchRecipies: async (filters) => {
        const drinks = await getRecipes(filters);
        set({
            drinks
        });
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        set({
            selectedRecipe,
            modal: true
        });
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe,
        });
    },
});