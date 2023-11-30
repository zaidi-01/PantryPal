import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recipe } from '@interfaces';
import { RecipeService } from '@services';
import {
  Observable,
  catchError,
  distinct,
  filter,
  finalize,
  map,
  switchMap,
  tap
} from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: `./recipe.component.html`,
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  isLoading = true;
  error?: string;
  recipe$: Observable<Recipe>;

  constructor(recipeService: RecipeService, route: ActivatedRoute) {
    this.recipe$ = route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      distinct(),
      filter((id: string | null): id is string => id !== null),
      map((id: string) => +id),
      tap(() => {
        this.isLoading = true;
        this.error = undefined;
      }),
      switchMap((id: number) =>
        recipeService
          .getRecipe(id)
          .pipe(finalize(() => (this.isLoading = false)))
      ),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.error = 'Recipe not found';
        } else {
          this.error = 'An error occurred';
        }
        return [];
      })
    );
  }
}
