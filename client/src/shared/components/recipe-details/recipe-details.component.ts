import { Component, Input } from '@angular/core';
import {
  DietaryRestriction,
  DietaryRestrictionDisplayNames,
  RecipeCategory,
  RecipeCategoryDisplayNames,
} from '@enums';
import { Recipe } from '@interfaces';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
})
export class RecipeDetailsComponent {
  @Input() public recipe!: Recipe;

  getCategoryName(category: RecipeCategory): string {
    return RecipeCategoryDisplayNames[category];
  }

  getRestrictionName(restriction: DietaryRestriction): string {
    return DietaryRestrictionDisplayNames[restriction];
  }
}
