import { Component } from '@angular/core';
import { Recipe, RecipeService } from '@services';

const TIMEOUT = 1000;

@Component({
  selector: 'app-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent {
  public searchedQuery = '';
  public inputText = '';
  public recipeList: Recipe[] = [];
  public isLoading: boolean = false;

  constructor(private recipeService: RecipeService) {}

  onSearch(searchQuery: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.recipeService
        .searchRecipes(searchQuery)
        .subscribe((recipeList: Recipe[]) => {
          this.recipeList = recipeList;
          this.isLoading = false;
          this.searchedQuery = searchQuery;
        });
    }, TIMEOUT);
  }
}
