import { Component } from '@angular/core';
import { Recipe, RecipeService } from '@services';

@Component({
  selector: 'app-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent {
  public searchText = '';
  public inputText = '';
  public recipeList: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  public onSearch(searchQuery: string) {
    this.searchText = searchQuery;
    this.recipeService
      .searchRecipes(searchQuery)
      .subscribe((recipeList: Recipe[]) => (this.recipeList = recipeList));
  }
}
