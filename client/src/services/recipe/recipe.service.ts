import { HttpClientService } from './../http-client/http-client.service';
import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  directions: string;
  dateCreated: Date;
  dateUpdated: Date;
  image?: string;
  categories?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  yield?: string;
  servings?: string;
  calories?: number;
  dietaryRestrictions?: string;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private httpClientService: HttpClientService) {}

  public getRecipe(id: number): Observable<Recipe> {
    return this.httpClientService.get<Recipe>(`recipe/${id}`);
  }

  public searchRecipes(searchQuery: string): Observable<Recipe[]> {
    return this.httpClientService.post<Recipe[]>('recipe/search', {
      searchQuery: searchQuery
    });
  }
}
