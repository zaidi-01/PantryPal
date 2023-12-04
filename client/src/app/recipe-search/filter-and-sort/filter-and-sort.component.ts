import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DietaryRestriction,
  DietaryRestrictionDisplayNames,
  RecipeCategory,
  RecipeCategoryDisplayNames,
} from '@enums';
import { Filter } from '@interfaces';
import { FridgeService, SortBy } from '@services';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrl: './filter-and-sort.component.scss',
})
export class FilterAndSortComponent {
  //TODO: Uncomment when Category and Restriction filters are implemented in the backend  //TODO: Uncomment when Category and Restriction filters are implemented in the backend
  public filterByFridge: boolean = false;
  // public categories: RecipeCategory[] = [];
  // public restrictions: DietaryRestriction[] = [];
  // public selectedCategories: RecipeCategory[] = [];
  // public selectedRestrictions: DietaryRestriction[] = [];
  public sortByOptions: SortBy[] = [] as SortBy[];

  public sortBy: SortBy = '' as SortBy;
  public filters: Filter<any>[] = [];

  @Output() public sortByChange: EventEmitter<SortBy> = new EventEmitter();
  @Output() public filtersChange: EventEmitter<Filter<any>[]> =
    new EventEmitter();

  constructor(private fridgeService: FridgeService) {
    // this.categories = Object.values(RecipeCategory)
    //   .filter((category) => typeof category === 'number')
    //   .map((category) => category as RecipeCategory);

    // this.restrictions = Object.values(DietaryRestriction)
    //   .filter((restriction) => typeof restriction === 'number')
    //   .map((restriction) => restriction as DietaryRestriction);

    this.sortByOptions = ['NameAsc', 'NameDesc', 'CaloriesAsc', 'CaloriesDesc'];
  }

  onChangeFridge() {
    if (this.filterByFridge) {
      this.filters.push({
        Key: 'Ingredients',
        Value: [...this.fridgeService.getIngredients().map((i) => i.name)],
      });
    } else {
      this.filters = this.filters.filter(
        (filter) => filter.Key !== 'Ingredients'
      );
    }

    this.onChangeFilters();
  }

  // onChangeCategories() {
  //   if (this.selectedCategories.length > 0) {
  //     const categoriesFilter = this.filters.find(
  //       (filter) => filter.Key === 'Categories'
  //     );
  //     if (categoriesFilter) {
  //       categoriesFilter.Value = [...this.selectedCategories];
  //     } else {
  //       this.filters.push({
  //         Key: 'Categories',
  //         Value: [...this.selectedCategories],
  //       });
  //     }
  //   } else {
  //     this.filters = this.filters.filter(
  //       (filter) => filter.Key !== 'Categories'
  //     );
  //   }

  //   this.onChangeFilters();
  // }

  // onChangeRestrictions() {
  //   if (this.selectedRestrictions.length > 0) {
  //     const restrictionsFilter = this.filters.find(
  //       (filter) => filter.Key === 'DietaryRestrictions'
  //     );
  //     if (restrictionsFilter) {
  //       restrictionsFilter.Value = [...this.selectedRestrictions];
  //     } else {
  //       this.filters.push({
  //         Key: 'DietaryRestrictions',
  //         Value: [...this.selectedRestrictions],
  //       });
  //     }
  //   } else {
  //     this.filters = this.filters.filter(
  //       (filter) => filter.Key !== 'DietaryRestrictions'
  //     );
  //   }
  //   this.onChangeFilters();
  // }

  // getCategoryName(category: RecipeCategory): string {
  //   return RecipeCategoryDisplayNames[category];
  // }

  // getRestrictionName(restriction: DietaryRestriction): string {
  //   return DietaryRestrictionDisplayNames[restriction];
  // }

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

  private onChangeFilters() {
    this.filtersChange.emit(this.filters);
  }

  onChangeSortBy() {
    console.log(this.sortBy);
    this.sortByChange.emit(this.sortBy);
  }
}
