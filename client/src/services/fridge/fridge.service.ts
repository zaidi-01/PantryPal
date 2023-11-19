import { Injectable } from '@angular/core';

export interface Ingredient {
  name: string;
}

//Will be replaced with API, using for testing
export const INGREDIENTS: Ingredient[] = [
  {name: 'Really long ingredient name' },
  {name: 'Chicken' },
  {name: 'Rice' },
  {name: 'Apple' },
  {name: 'Lettuce' },
  {name: 'Beans' },
  {name: 'Potato' },
  {name: 'Salt' },
  {name: 'Sugar' },
  {name: 'Flour' },
  {name: 'Eggs' },
  {name: 'Pepper' },
];


@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  constructor() {}

  public getAvailableIngredients(): string[] {
    //TODO: Replace when Backend API available
    return [...INGREDIENTS].map((ingredient) => ingredient.name).sort();
  }

  public getLocallyStoredIngredients(): Set<string> {
    const localIngredients = localStorage.getItem('userIngredients');
    if (localIngredients != null) {
      return new Set<string>(localIngredients.split(','));
    } else {
      return new Set<string>();
    }
  }
}
