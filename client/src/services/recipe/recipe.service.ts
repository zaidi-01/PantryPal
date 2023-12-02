import { Inject, Injectable } from '@angular/core';
import { Recipe } from '@interfaces';
import { Observable, tap } from 'rxjs';
import { HttpClientService } from './../http-client/http-client.service';

/**
 * Service for managing recipes.
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private httpClientService: HttpClientService,
    @Inject('API_URL') private apiUrl: string
  ) {}

  /**
   * Retrieves a recipe by its ID.
   * @param id - The ID of the recipe.
   * @returns An Observable that emits the recipe.
   */
  public getRecipe(id: number): Observable<Recipe> {
    return this.httpClientService
      .get<Recipe>(`recipe/${id}`)
      .pipe(tap((recipe) => this.addImageUrls(recipe)));
  }

  /**
   * Searches for recipes based on a search query.
   * @param searchQuery - The search query.
   * @returns An Observable that emits an array of recipes.
   */
  public searchRecipes(searchQuery: string): Observable<Recipe[]> {
    return this.httpClientService
      .post<Recipe[]>('recipe/search', {
        searchQuery: searchQuery,
      })
      .pipe(
        tap((recipes) => recipes.forEach((recipe) => this.addImageUrls(recipe)))
      );
  }

  /**
   * Deletes a recipe by its ID.
   * @param id - The ID of the recipe to delete.
   * @returns An Observable that completes when the recipe is deleted.
   */
  public deleteRecipe(id: number): Observable<void> {
    return this.httpClientService.delete(`recipe/${id}`);
  }

  /**
   * Adds image URLs to a recipe.
   * @param recipe - The recipe to add image URLs to.
   */
  private addImageUrls(recipe: Recipe) {
    recipe.imageUrls = recipe.imageIds.map(
      (imageId) => `${this.apiUrl}recipe/image/${imageId}`
    );
  }
}
