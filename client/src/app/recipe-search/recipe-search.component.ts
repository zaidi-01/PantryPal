import { Component, HostListener } from '@angular/core';
import { Filter, Recipe } from '@interfaces';
import { RecipeService, SortBy } from '@services';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  map,
  merge,
  switchMap,
  tap,
} from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

const MAX_SEARCH_RESULTS = 20;

@Component({
  selector: 'app-search',
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.scss',
})
export class RecipeSearchComponent {
  isLoading: boolean = false;
  searchQuery: string = '';
  inputText: string = '';
  recipeList: Recipe[] = [];

  recipeList$: Observable<Recipe[]>;

  private currentPage: number = 1;
  private searchQuery$: Subject<string> = new Subject();
  private loadNextPage$: Subject<void> = new Subject();

  private filters$: BehaviorSubject<Filter<any>[]> = new BehaviorSubject(
    [] as Filter<any>[]
  );
  private sortBy$: BehaviorSubject<SortBy> = new BehaviorSubject('' as SortBy);

  constructor(private recipeService: RecipeService) {
    this.recipeList$ = merge(
      this.searchQuery$.pipe(
        withLatestFrom(this.filters$, this.sortBy$),
        tap((_) => (this.isLoading = true)),
        switchMap(([searchQuery, filters, sortBy]) => {
          return this.recipeService
            .searchRecipes(searchQuery, 0, MAX_SEARCH_RESULTS, filters, sortBy)
            .pipe(finalize(() => (this.isLoading = false)));
        })
      ),

      this.loadNextPage$.pipe(
        withLatestFrom(this.searchQuery$, this.filters$, this.sortBy$),
        tap((_) => (this.isLoading = true)),
        switchMap(([_, searchQuery, filters, sortBy]) =>
          this.recipeService
            .searchRecipes(
              searchQuery,
              this.currentPage * MAX_SEARCH_RESULTS,
              MAX_SEARCH_RESULTS,
              filters,
              sortBy
            )
            .pipe(finalize(() => (this.isLoading = false)))
        ),
        map((recipeList) => [...this.recipeList, ...recipeList])
      )
    ).pipe(tap((recipeList) => (this.recipeList = recipeList)));
  }

  onFiltersChange(filters: Filter<any>[]) {
    this.filters$.next(filters);
  }

  onSortByChange(sortBy: SortBy) {
    this.sortBy$.next(sortBy);
  }

  public onSearch(searchQuery: string) {
    searchQuery = searchQuery.trim().replace(/\s+/g, ' ');
    this.searchQuery = searchQuery;
    this.currentPage = 1;
    this.searchQuery$.next(this.searchQuery);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max) {
      this.loadNextPage();
    }
  }

  public loadNextPage() {
    this.currentPage++;
    this.loadNextPage$.next();
  }
}
