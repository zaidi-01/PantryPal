import { Injectable } from '@angular/core';
import { HttpClientService } from './../http-client/http-client.service';
import { Observable } from 'rxjs';

export interface Ingredient {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  public apiIngredientsList: Ingredient[] = [];

  constructor(private httpClientService: HttpClientService) {}

  getIngredientsData(): Observable<Ingredient[]> {
    return this.httpClientService.get<Ingredient[]>('fridge');
  }

  getLocallyStoredIngredients(): Set<string> {
    const localIngredients = localStorage.getItem('userIngredients');
    if (localIngredients != null) {
      return new Set<string>(localIngredients.split(','));
    } else {
      return new Set<string>();
    }
  }
}
