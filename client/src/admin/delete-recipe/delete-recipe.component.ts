import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService, RecipeService } from '@services';
import { Observable, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
})
export class DeleteRecipeComponent {
  deleteRecipe: (recipeId: string) => Observable<void>;

  constructor(recipeService: RecipeService, alertService: AlertService) {
    this.deleteRecipe = (recipeId: string) => {
      alertService.clear();

      return recipeService.deleteRecipe(+recipeId).pipe(
        tap(() => alertService.success(`Recipe #${recipeId} deleted`)),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            alertService.error(`Recipe #${recipeId} not found`);
          } else {
            alertService.error(`Failed to delete recipe #${recipeId}`);
          }
          throw err;
        })
      );
    };
  }
}
