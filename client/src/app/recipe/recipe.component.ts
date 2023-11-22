import { Component } from '@angular/core';
import { Recipe, RecipeService } from '@services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

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
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        filter((id: string | null): id is string => id !== null),
        map((id: string) => +id),
        switchMap((id: number) => this.recipeService.getRecipe(id))
      )
      .subscribe(
        (recipe: Recipe) => (this.recipe = recipe),
        (error) => console.error(error)
      );
  }
}
