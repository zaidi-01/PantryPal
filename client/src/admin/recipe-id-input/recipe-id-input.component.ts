import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NEVER, Observable, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-id-input',
  templateUrl: './recipe-id-input.component.html',
  styleUrl: './recipe-id-input.component.scss',
})
export class RecipeIdInputComponent {
  @Input() onSubmit: (recipeId: string) => Observable<any> = () => NEVER;

  recipeIdControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^-?[0-9]+$/),
    Validators.min(1),
  ]);

  recipeIdForm: FormGroup = new FormGroup({
    recipeId: this.recipeIdControl,
  });

  constructor() {}

  onSubmitInternal() {
    this.recipeIdControl.markAsTouched();

    if (this.recipeIdForm.invalid) {
      return;
    }
    this.recipeIdForm.disable();
    this.onSubmit(this.recipeIdControl.value ?? '')
      .pipe(
        tap(() => this.recipeIdForm.reset()),
        finalize(() => this.recipeIdForm.enable())
      )
      .subscribe();
  }
}
