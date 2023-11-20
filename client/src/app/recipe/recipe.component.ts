import { Component } from '@angular/core';
import { Recipe, RecipeService } from '@services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: `./recipe.component.html`,
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  public recipe: Recipe = {} as Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      let recipeIdParam = params.get('id');
      if (recipeIdParam !== null) {
        let recipeId = +recipeIdParam;
        this.recipeService.getRecipe(recipeId).subscribe(
          (recipe) => {
            this.recipe = recipe;
          },
          (error) => console.error(error)
        );
      }
    });
  }
}
