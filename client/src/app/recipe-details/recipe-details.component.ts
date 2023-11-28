import { Component, Input } from '@angular/core';
import { Recipe } from '@services';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
})
export class RecipeDetailsComponent {
  @Input() public recipe!: Recipe;
}
