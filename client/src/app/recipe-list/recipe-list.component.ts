import { Component, Input } from '@angular/core';
import { Recipe } from '@interfaces';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent {
  @Input() public recipes: Recipe[] = [];

  constructor(public appPaths: ApplicationPaths) {}
}
