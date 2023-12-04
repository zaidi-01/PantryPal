import { Component } from '@angular/core';
import { Recipe } from '@interfaces';
import { AlertService, RecipeService } from '@services';
import { Observable, catchError, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  public recipe!: Recipe;
  public getRecipe: (recipeId: string) => Observable<Recipe>;
  public editRecipe: (recipe: Recipe, newImages: File[]) => Observable<any>;

  constructor(recipeService: RecipeService, alertService: AlertService) {
    alertService.clear();

    this.getRecipe = (recipeId: string): Observable<Recipe> => {
      return recipeService.getRecipe(+recipeId).pipe(
        tap((recipe) => (this.recipe = recipe)),
        catchError((err) => {
          if (err.status === 404) {
            alertService.error(`Recipe #${recipeId} not found`);
          } else {
            alertService.error(`Failed to retrieve recipe #${recipeId}`);
          }
          throw err;
        })
      );
    };
    this.editRecipe = (recipe: Recipe, newImages: File[]) => {
      return recipeService.updateRecipe(recipe).pipe(
        tap(() => alertService.success(`Recipe #${recipe.id} updated`)),
        catchError((err) => {
          alertService.error(`Failed to edit recipe #${recipe.id}`);
          throw err;
        }),
        switchMap(() => {
          if (!newImages.length) {
            return [];
          }
          return recipeService.uploadImages(recipe.id, newImages).pipe(
            catchError(() => {
              alertService.error(`Failed to upload images`);
              return [];
            })
          );
        })
      );
    };
  }
}
