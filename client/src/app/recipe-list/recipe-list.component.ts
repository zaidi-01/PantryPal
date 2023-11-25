import { Component, Input } from '@angular/core';
import { Recipe } from '@services';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent {
  @Input() public recipeList: Recipe[] = [];

  constructor(public appPaths: ApplicationPaths) {}
}
