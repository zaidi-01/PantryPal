import { Component, Input } from '@angular/core';
import { Recipe } from '@interfaces';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrl: './recipe-summary.component.scss',
})
export class RecipeSummaryComponent {
  @Input() recipe!: Recipe;

  constructor(public appPaths: ApplicationPaths) {}
}
