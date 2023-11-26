import { Component } from '@angular/core';
import { RecipeService } from '@services';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
})
export class DeleteRecipeComponent {
  deleteRecipe = (recipeId: string) =>
    this.recipeService.deleteRecipe(+recipeId);

  constructor(private recipeService: RecipeService) {}
}
