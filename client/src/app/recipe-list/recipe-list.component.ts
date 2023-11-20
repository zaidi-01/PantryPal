import { Component, Input } from '@angular/core';
import { Recipe, RecipeService } from '@services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  @Input() public searchedQuery: string = '';
  @Input() public recipeList: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
  
  //TODO : filter and sort has to be implemented
}
