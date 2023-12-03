import { Injectable } from '@angular/core';
import { Ingredient } from '@interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClientService } from '../http-client/http-client.service';

/**
 * The key used to store the ingredients in the browser's localStorage.
 */
export const KEY_FRIDGE_INGREDIENTS = 'userIngredients';

/**
 * Service for managing the fridge.
 */
@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  private allIngredients!: Ingredient[];

  constructor(private httpClientService: HttpClientService) {}

  /**
   * Retrieves the list of all ingredients from the server.
   * If the list has already been retrieved, it will return the cached list.
   * @returns An Observable that emits an array of Ingredient objects.
   */
  getAllIngredients(): Observable<Ingredient[]> {
    if (this.allIngredients) {
      return of(this.allIngredients);
    }

    return this.httpClientService
      .get<Ingredient[]>('fridge')
      .pipe(tap((ingredients) => (this.allIngredients = ingredients)));
  }

  /**
   * Retrieves the locally stored ingredients from the browser's localStorage.
   * @returns An array of Ingredient objects.
   */
  getIngredients(): Ingredient[] {
    const localIngredients = localStorage.getItem(KEY_FRIDGE_INGREDIENTS);

    if (!localIngredients) {
      return [];
    }

    try {
      return JSON.parse(localIngredients);
    } catch (e) {
      console.error('Error parsing local ingredients', e);
      return [];
    }
  }
}
