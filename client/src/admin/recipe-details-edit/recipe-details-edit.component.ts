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
  @Input() public recipe!: Recipe;
  @Input() public onSubmit: (
    recipe: Recipe,
    newImages: File[]
  ) => Observable<any> = () => NEVER;

  categoryValues = Object.values(RecipeCategory)
    .filter((category) => typeof category === 'number')
    .map((category) => category as RecipeCategory);
  restrictionValues = Object.values(DietaryRestriction)
    .filter((restriction) => typeof restriction === 'number')
    .map((restriction) => restriction as DietaryRestriction);

  imageControl = new FormControl('');
  nameControl = new FormControl(this.recipe?.name ?? '', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  descriptionControl = new FormControl(this.recipe?.description ?? '', [
    Validators.required,
    Validators.maxLength(65533),
  ]);
  prepTimeControl = new FormControl(this.recipe?.prepTime ?? undefined, [
    Validators.maxLength(255),
  ]);
  cookTimeControl = new FormControl(this.recipe?.cookTime ?? undefined, [
    Validators.maxLength(255),
  ]);
  totalTimeControl = new FormControl(this.recipe?.totalTime ?? undefined, [
    Validators.maxLength(255),
  ]);
  servingsControl = new FormControl(this.recipe?.servings ?? undefined, [
    Validators.maxLength(255),
  ]);
  caloriesControl = new FormControl(this.recipe?.calories ?? undefined, [
    Validators.min(0),
    Validators.max(65535),
    Validators.pattern('^[0-9]*$'),
  ]);
  categoriesControl = new FormControl(this.recipe?.categories ?? []);
  restrictionsControl = new FormControl(this.recipe?.dietaryRestrictions ?? []);
  ingredientsControl = new FormControl(this.recipe?.ingredients ?? '', [
    Validators.required,
    Validators.maxLength(65533),
  ]);
  directionsControl = new FormControl(this.recipe?.directions ?? '', [
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
      calories: this.caloriesControl.value
        ? +this.caloriesControl.value
        : undefined,
      categories: this.categoriesControl.value ?? [],
      dietaryRestrictions: this.restrictionsControl.value ?? [],
      ingredients: this.ingredientsControl.value ?? '',
      directions: this.directionsControl.value ?? '',
    };

    console.log(this.newImages);
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
