import { Injectable } from '@angular/core';
import { Ingredient } from '@interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClientService } from './../http-client/http-client.service';

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
   * Retrieves the list of ingredients from the API.
   * @returns An Observable that emits an array of Ingredient objects.
   */
    if (this.allIngredients) {
      return of(this.allIngredients);
    }

    return this.httpClientService
      .get<Ingredient[]>('fridge')
      .pipe(tap((ingredients) => (this.allIngredients = ingredients)));
  }

  /**
   * Retrieves the locally stored ingredients from the browser's localStorage.
   * @returns A Set containing the names of the locally stored ingredients.
   */
  getLocallyStoredIngredients(): Set<string> {
    const localIngredients = localStorage.getItem('userIngredients');
    if (localIngredients != null) {
      return new Set<string>(localIngredients.split(','));
    } else {
      return new Set<string>();
    }
  }
}
