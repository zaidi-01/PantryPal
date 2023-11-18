import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { INGREDIENTS } from './mock-ingredients';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor() { }


  public getAvailableIngredients(): string[]  
  {
    //TODO: Replace when Backend API available
    return [...INGREDIENTS].map(ingredient => ingredient.name).sort();
  }

  public getLocallyStoredIngredients():  Set<string>
  {
    const localIngredients = localStorage.getItem("userIngredients");
    if (localIngredients != null)
    {
      return new Set<string>(localIngredients.split(','));
    }
    else
    {
      return new Set<string>();
    }
  }

}
