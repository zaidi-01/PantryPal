import { Component } from '@angular/core';
import { Recipe } from '@interfaces';
import { AlertService, RecipeService } from '@services';
import { Observable, catchError, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  public createRecipe: (recipe: Recipe, images: File[]) => Observable<any>;

  constructor(recipeService: RecipeService, alertService: AlertService) {
    this.createRecipe = (recipe, images) =>
      recipeService.createRecipe(recipe).pipe(
        tap((recipeId) => alertService.success(`Recipe #${recipeId} created`)),
        catchError((err) => {
          alertService.error(`Failed to create recipe`);
          throw err;
        }),
        switchMap((recipeId) => {
          if (!images.length) {
            return [null];
          }
          return recipeService.uploadImages(recipeId, images).pipe(
            catchError(() => {
              alertService.error(`Failed to upload images`);
              return [null];
            })
          );
        })
      );
  }
}
