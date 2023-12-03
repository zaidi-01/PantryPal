import { Component } from '@angular/core';
import { Recipe } from '@interfaces';
import { AlertService, RecipeService } from '@services';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  public createRecipe: (recipe: Recipe, images: File[]) => Observable<void>;

  constructor(
    private recipeService: RecipeService,
    private alertService: AlertService
  ) {
    this.createRecipe = (recipe, images) =>
      this.recipeService.createRecipe(recipe).pipe(
        tap((recipeId) =>
          this.alertService.success(`Recipe #${recipeId} created`)
        ),
        catchError((err) => {
          alertService.error(`Failed to create recipe`);
          throw err;
        }),
        switchMap((recipeId) =>
          this.recipeService.uploadImages(recipeId, images).pipe(
            catchError(() => {
              alertService.error(`Failed to upload images`);
              return [null];
            })
          )
        ),
        map(() => {})
      );
  }
}
