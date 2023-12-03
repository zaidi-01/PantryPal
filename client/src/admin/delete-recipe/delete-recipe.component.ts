import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DialogData } from '@interfaces';
import { AlertService, DialogService, RecipeService } from '@services';
import { Observable, catchError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
})
export class DeleteRecipeComponent {
  public dialogData: DialogData = {
    title: '',
    message: `Are you sure you want the system to search for and delete this recipe if it exists?`,
    type: 'confirmation',
    primaryBtnText: 'Delete',
    secondaryBtnText: 'Cancel',
  };
  public deleteRecipe: (recipeId: string) => Observable<void>;

  constructor(
    recipeService: RecipeService,
    alertService: AlertService,
    private dialogService: DialogService
  ) {
    this.deleteRecipe = (recipeId: string): Observable<void> => {
      alertService.clear();

      this.dialogData.title = 'Confirm Deletion for Recipe #' + recipeId;
      return this.dialogService.open(this.dialogData).pipe(
        filter((confirmed) => confirmed),
        switchMap((_) => recipeService.deleteRecipe(+recipeId)),
        tap((_) => alertService.success(`Recipe #${recipeId} deleted`)),
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
