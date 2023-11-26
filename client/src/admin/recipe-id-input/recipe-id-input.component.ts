import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NEVER, Observable, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-id-input',
  templateUrl: './recipe-id-input.component.html',
  styleUrl: './recipe-id-input.component.scss',
})
export class RecipeIdInputComponent {
  @Input() onSubmit: (recipeId: string) => Observable<void> = () => NEVER;

  recipeIdControlName = 'recipeId';
  recipeIdControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  deleteRecipeForm: FormGroup = new FormGroup({
    [this.recipeIdControlName]: this.recipeIdControl,
  });

  constructor() {}

  onSubmitInternal() {
    if (this.deleteRecipeForm.invalid) {
      return;
    }

    this.deleteRecipeForm.disable();
    this.onSubmit(this.recipeIdControl.value ?? '')
      .pipe(
        tap(() => this.deleteRecipeForm.reset()),
        finalize(() => this.deleteRecipeForm.enable())
      )
      .subscribe();
  }
}
