import { Component } from '@angular/core';
import { Ingredient } from '@interfaces';
import { AlertService, FridgeService, KEY_FRIDGE_INGREDIENTS } from '@services';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss',
})
export class FridgeComponent {
  search = '';

  search$: BehaviorSubject<string>;
  allIngredients$: Observable<Ingredient[]>;
  fridgeIngredients$: BehaviorSubject<Ingredient[]>;
  filteredIngredients$: Observable<Ingredient[]>;

  get fridgeIngredients(): Ingredient[] {
    return this.fridgeIngredients$.getValue();
  }

  constructor(fridgeService: FridgeService, alertService: AlertService) {
    this.search$ = new BehaviorSubject<string>('');
    this.allIngredients$ = fridgeService.getAllIngredients().pipe(
      catchError(() => {
        alertService.error('Failed to load ingredients');
        return of([]);
      })
    );
    this.fridgeIngredients$ = new BehaviorSubject<Ingredient[]>(
      fridgeService.getIngredients()
    );
    this.filteredIngredients$ = combineLatest([
      this.allIngredients$,
      this.fridgeIngredients$,
      this.search$,
    ]).pipe(
      switchMap(([allIngredients, fridgeIngredients, search]) => {
        // Case 1: No search, return fridge ingredients sorted by name
        if (!search) {
          return of(fridgeIngredients).pipe(
            map((ingredients) => ingredients.sort(this.sortByName))
          );
        }

        // Case 2: Search, return all ingredients filtered by search and sorted by fridge
        const filteredIngredients = allIngredients.filter((ingredient) =>
          ingredient.name.toLowerCase().includes(search.toLowerCase())
        );
        return of(filteredIngredients).pipe(
          map((ingredients) => ingredients.sort(this.sortByFridge.bind(this)))
        );
      }),
      startWith([])
    );
  }

  isInFridge(ingredient: Ingredient): boolean {
    return this.fridgeIngredients.some(
      (fridgeIngredient) => fridgeIngredient.id === ingredient.id
    );
  }

  onSearchChange(value: string): void {
    this.search$.next(value);
  }

  addIngredient(ingredient: Ingredient): void {
    const ingredients = [...this.fridgeIngredients, ingredient];
    this.fridgeIngredients$.next(ingredients);
    this.saveIngredients(ingredients);
  }

  removeIngredient(ingredient: Ingredient): void {
    const ingredients = this.fridgeIngredients.filter(
      (fridgeIngredient) => fridgeIngredient.id !== ingredient.id
    );
    this.fridgeIngredients$.next(ingredients);
    this.saveIngredients(ingredients);
  }

  saveIngredients(ingredients: Ingredient[]): void {
    localStorage.setItem(KEY_FRIDGE_INGREDIENTS, JSON.stringify(ingredients));
  }

  sortByName(a: Ingredient, b: Ingredient): number {
    return a.name.localeCompare(b.name);
  }

  sortByFridge(a: Ingredient, b: Ingredient): number {
    const aInFridge = this.isInFridge(a);
    const bInFridge = this.isInFridge(b);

    if (aInFridge && !bInFridge) {
      return -1;
    }

    if (!aInFridge && bInFridge) {
      return 1;
    }

    return this.sortByName(a, b);
  }
}
