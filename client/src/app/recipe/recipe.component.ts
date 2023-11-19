import { Component } from '@angular/core';
import { Recipe, RecipeService } from '@services';

@Component({
  selector: 'app-recipe',
  templateUrl: `./recipe.component.html`,
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  public recipe: Recipe = {} as Recipe;


  //TODO(SteveShibly8): Replace with actual recipe ID
  constructor(private recipeService: RecipeService) {
    recipeService.getRecipe(1).subscribe(
      (result) => {
        this.recipe = result;
      },
      (error) => console.error(error)
    );
  }
}
