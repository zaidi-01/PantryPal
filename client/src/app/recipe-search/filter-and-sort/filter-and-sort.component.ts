import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DietaryRestriction,
  DietaryRestrictionDisplayNames,
  RecipeCategory,
  RecipeCategoryDisplayNames,
} from '@enums';
import { FridgeService, SortBy } from '@services';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrl: './filter-and-sort.component.scss',
})
export class FilterAndSortComponent {
  public filterByFridge: boolean = false;
  public categories: RecipeCategory[] = [];
  public restrictions: DietaryRestriction[] = [];
  public selectedCategories: RecipeCategory[] = [];
  public selectedRestrictions: DietaryRestriction[] = [];
  public sortByOptions: SortBy[] = [] as SortBy[];

  public sortBy: SortBy = '' as SortBy;

  @Output() public sortByChange: EventEmitter<SortBy> = new EventEmitter();

  constructor(private fridgeService: FridgeService) {
    this.categories = Object.values(RecipeCategory)
      .filter((category) => typeof category === 'number')
      .map((category) => category as RecipeCategory);

    this.restrictions = Object.values(DietaryRestriction)
      .filter((restriction) => typeof restriction === 'number')
      .map((restriction) => restriction as DietaryRestriction);

    this.sortByOptions = ['NameAsc', 'NameDesc', 'CaloriesAsc', 'CaloriesDesc'];
  }

  onChangeSortBy() {
    console.log(this.sortBy);
    this.sortByChange.emit(this.sortBy);
  }

  getSortByName(sortBy: SortBy): string {
    switch (sortBy) {
      case 'NameAsc':
        return 'Name (A-Z)';
      case 'NameDesc':
        return 'Name (Z-A)';
      case 'CaloriesAsc':
        return 'Calories (Low-High)';
      case 'CaloriesDesc':
        return 'Calories (High-Low)';
      default:
        return '';
    }
  }
}
