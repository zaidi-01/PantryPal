import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DietaryRestriction,
  DietaryRestrictionDisplayNames,
  RecipeCategory,
  RecipeCategoryDisplayNames,
} from '@enums';
import { Recipe } from '@interfaces';
import { NEVER, Observable, finalize, tap } from 'rxjs';
import { ApplicationPaths } from 'src/app/app.constants';

@Component({
  selector: 'app-recipe-details-edit',
  templateUrl: './recipe-details-edit.component.html',
  styleUrl: './recipe-details-edit.component.scss',
})
export class RecipeDetailsEditComponent {
  private _recipe!: Recipe;

  @Input() public onSubmit: (
    recipe: Recipe,
    newImages: File[]
  ) => Observable<any> = () => NEVER;

  @Input() public set recipe(recipe: Recipe) {
    this._recipe = recipe;

    this.nameControl.setValue(recipe.name);
    this.descriptionControl.setValue(recipe.description);
    this.prepTimeControl.setValue(recipe.prepTime ?? '');
    this.cookTimeControl.setValue(recipe.cookTime ?? '');
    this.totalTimeControl.setValue(recipe.totalTime ?? '');
    this.servingsControl.setValue(recipe.servings ?? '');
    this.caloriesControl.setValue(recipe.calories);
    this.categoriesControl.setValue(recipe.categories ?? []);
    this.restrictionsControl.setValue(recipe.dietaryRestrictions ?? []);
    this.ingredientsControl.setValue(recipe.ingredients);
    this.directionsControl.setValue(recipe.directions);
  }

  public get recipe(): Recipe {
    return this._recipe;
  }

  categoryValues = Object.values(RecipeCategory)
    .filter((category) => typeof category === 'number')
    .map((category) => category as RecipeCategory);
  restrictionValues = Object.values(DietaryRestriction)
    .filter((restriction) => typeof restriction === 'number')
    .map((restriction) => restriction as DietaryRestriction);

  imageControl = new FormControl('');
  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  descriptionControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(65533),
  ]);
  prepTimeControl = new FormControl('', [
    Validators.maxLength(255),
  ]);
  cookTimeControl = new FormControl('', [
    Validators.maxLength(255),
  ]);
  totalTimeControl = new FormControl('', [
    Validators.maxLength(255),
  ]);
  servingsControl = new FormControl('', [
    Validators.maxLength(255),
  ]);
  caloriesControl = new FormControl<number | undefined>(undefined, [
    Validators.min(0),
    Validators.max(65535),
    Validators.pattern('^[0-9]*$'),
  ]);
  categoriesControl = new FormControl([] as RecipeCategory[]);
  restrictionsControl = new FormControl([] as DietaryRestriction[]);
  ingredientsControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(65533),
  ]);
  directionsControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(65533),
  ]);

  recipeForm: FormGroup = new FormGroup({
    image: this.imageControl,
    name: this.nameControl,
    description: this.descriptionControl,
    prepTime: this.prepTimeControl,
    cookTime: this.cookTimeControl,
    totalTime: this.totalTimeControl,
    servings: this.servingsControl,
    calories: this.caloriesControl,
    categories: this.categoriesControl,
    restrictions: this.restrictionsControl,
    ingredients: this.ingredientsControl,
    directions: this.directionsControl,
  });

  private newImages: File[] = [];

  get imageUrl(): string {
    return this.recipe?.imageUrls[0];
  }

  get hasImage(): boolean {
    return this.recipe?.imageUrls?.length > 0;
  }

  get categories(): RecipeCategory[] {
    return this.categoriesControl.value ?? [];
  }

  get restrictions(): DietaryRestriction[] {
    return this.restrictionsControl.value ?? [];
  }

  constructor(public appPaths: ApplicationPaths) {}

  getCategoryName(category: RecipeCategory): string {
    return RecipeCategoryDisplayNames[category];
  }

  getRestrictionName(restriction: DietaryRestriction): string {
    return DietaryRestrictionDisplayNames[restriction];
  }

  deleteImage() {
    if (!this.recipe) {
      return;
    }

    this.recipe.imageIds = [];
    this.recipe.imageUrls = [];
  }

  onImageChange(event: Event) {
    // TODO: Investigate why images are not storing in the database
    // const files = (event.target as HTMLInputElement).files;
    // if (!files) {
    //   return;
    // }
    // for (const fileName in files) {
    //   const file = files[fileName];
    //   const fileSize = file.size / 1024 / 1024;
    //   if (fileSize > 1) {
    //     this.alertService.error('File size must be less than 1 MB.');
    //     return;
    //   }
    // }
    // this.deleteImage();
    // this.newImages = Array.from(files);
  }

  onSubmitInternal() {
    this.recipeForm.markAllAsTouched();

    if (!this.recipeForm.valid) {
      return;
    }

    this.recipeForm.disable();

    const newRecipe: Recipe = {
      ...this.recipe,
      name: this.nameControl.value ?? '',
      description: this.descriptionControl.value ?? '',
      prepTime: this.prepTimeControl.value ?? undefined,
      cookTime: this.cookTimeControl.value ?? undefined,
      totalTime: this.totalTimeControl.value ?? undefined,
      servings: this.servingsControl.value ?? undefined,
      calories: this.caloriesControl.value!,
      categories: this.categoriesControl.value ?? [],
      dietaryRestrictions: this.restrictionsControl.value ?? [],
      ingredients: this.ingredientsControl.value ?? '',
      directions: this.directionsControl.value ?? '',
    };

    this.onSubmit(newRecipe, this.newImages)
      .pipe(
        tap(() => {
          this.recipeForm.reset();
          this.newImages = [];
        }),
        finalize(() => this.recipeForm.enable())
      )
      .subscribe();
  }
}
