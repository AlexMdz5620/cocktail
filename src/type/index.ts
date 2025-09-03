import type { z } from "zod";
import { CategoriesAPIResponseSquema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchCategorySquema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSquema>;
export type SearchFilter = z.infer<typeof SearchCategorySquema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
