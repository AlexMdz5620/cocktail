import api from "../lib/axios";
import { CategoriesAPIResponseSquema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import type { Drink, SearchFilter } from "../type";


export async function getCategories() {
    const url = '/list.php?c=list';
    const { data } = await api(url);
    const res = CategoriesAPIResponseSquema.safeParse(data);
    if (res.success) {
        return res.data;
    }
}

export async function getRecipes(filters: SearchFilter) {
    const { category, ingredient } = filters;
    const url = `/filter.php?c=${category}&i=${ingredient}`;
    const { data } = await api(url);
    const res = DrinksAPIResponse.safeParse(data);
    if (res.success) {
        return res.data;
    }
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `/lookup.php?i=${id}`;
    const { data } = await api(url);
    const res = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    if (res.success) {
        return res.data;
    }
}