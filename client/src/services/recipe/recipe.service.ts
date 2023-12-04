import { take } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { DietaryRestriction, RecipeCategory } from '@enums';
import { Recipe } from '@interfaces';
import { Observable, forkJoin, tap } from 'rxjs';
import { HttpClientService } from './../http-client/http-client.service';

export type SortBy = 'NameAsc' | 'NameDesc' | 'CaloriesAsc' | 'CaloriesDesc';

interface SearchModel {
  searchQuery: string;
  skip: number;
  take: number;
  sortBy?: SortBy;
}

/**
 * Represents a new recipe.
 */
interface RecipeCreate {
  /** The name of the recipe. */
  name: string;
  /** The description of the recipe. */
  description: string;
  /** The ingredients of the recipe. */
  ingredients: string;
  /** The directions of the recipe. */
  directions: string;
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
  /** The categories of the recipe. */
  categories: RecipeCategory[];
  /** The dietary restrictions of the recipe. */
  dietaryRestrictions: DietaryRestriction[];
}

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
  public searchRecipes(
    searchQuery: string,
    skip: number,
    take: number,
    sortBy?: SortBy,
  ): Observable<Recipe[]> {
    return this.httpClientService
      .post<Recipe[]>('recipe/search', {
        searchQuery: searchQuery,
        skip: skip,
        take: take,
        sortBy: sortBy,
      })
      .pipe(
        tap((recipes) => recipes.forEach((recipe) => this.addImageUrls(recipe)))
      );
  }

  public createRecipe(recipe: Recipe): Observable<number> {
    const recipeCreate: RecipeCreate = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      totalTime: recipe.totalTime,
      yield: recipe.yield,
      servings: recipe.servings,
      calories: recipe.calories,
      categories: recipe.categories,
      dietaryRestrictions: recipe.dietaryRestrictions,
    };
    return this.httpClientService.post<number>('recipe', recipeCreate);
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
   * Uploads an image to a recipe.
   * @param recipeId - The ID of the recipe to upload the image to.
   * @param image - The image to upload.
   * @returns An Observable that emits the ID of the uploaded image.
   */
  public uploadImage(recipeId: number, image: File): Observable<number> {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClientService.post<1>(`recipe/${recipeId}/image`, formData);
  }

  /**
   * Uploads multiple images to a recipe.
   * @param recipeId - The ID of the recipe to upload the images to.
   * @param images - The images to upload.
   * @returns An Observable that emits an array of the IDs of the uploaded images.
   */
  public uploadImages(recipeId: number, images: File[]): Observable<number[]> {
    return forkJoin(images.map((image) => this.uploadImage(recipeId, image)));
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
