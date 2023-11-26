import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './../http-client/http-client.service';

/**
 * Represents a recipe.
 */
export interface Recipe {
  /** The ID of the recipe. */
  id: number;
  /** The name of the recipe. */
  name: string;
  /** The description of the recipe. */
  description: string;
  /** The ingredients of the recipe. */
  ingredients: string;
  /** The directions of the recipe. */
  directions: string;
  /** The date the recipe was created. */
  dateCreated: Date;
  /** The date the recipe was last updated. */
  dateUpdated: Date;
  /** The image URL of the recipe. */
  image?: string;
  /** The categories of the recipe (comma-separated). */
  categories?: string;
  /** The cook time of the recipe. */
  cookTime?: string;
  /** The prep time of the recipe. */
  prepTime?: string;
  /** The total time of the recipe. */
  totalTime?: string;
  /** The yield of the recipe. */
  yield?: string;
  /** The number of servings of the recipe. */
  servings?: string;
  /** The calories of the recipe. */
  calories?: number;
  /** The dietary restrictions of the recipe (comma-separated). */
  dietaryRestrictions?: string;
}

/**
 * Service for managing recipes.
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClientService: HttpClientService) {}

  /**
   * Retrieves a recipe by its ID.
   * @param id - The ID of the recipe.
   * @returns An Observable that emits the recipe.
   */
  public getRecipe(id: number): Observable<Recipe> {
    return this.httpClientService.get<Recipe>(`recipe/${id}`);
  }

  /**
   * Searches for recipes based on a search query.
   * @param searchQuery - The search query.
   * @returns An Observable that emits an array of recipes.
   */
  public searchRecipes(searchQuery: string): Observable<Recipe[]> {
    return this.httpClientService.post<Recipe[]>('recipe/search', {
      searchQuery: searchQuery,
    });
  }

  /**
   * Deletes a recipe by its ID.
   * @param id - The ID of the recipe to delete.
   * @returns An Observable that completes when the recipe is deleted.
   */
  public deleteRecipe(id: number): Observable<void> {
    return this.httpClientService.delete(`recipe/${id}`);
  }
}
