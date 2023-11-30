import { Component } from '@angular/core';
import { Recipe } from '@interfaces';
import { RecipeService } from '@services';
import { Observable, Subject, finalize, switchMap, tap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.scss',
})
export class RecipeSearchComponent {
  public searchedQuery = '';
  public inputText = '';
  public isLoading: boolean = false;
  public recipeList$: Observable<Recipe[]>;
  private inputText$: Subject<string> = new Subject();

  constructor(private recipeService: RecipeService) {
    this.recipeList$ = this.inputText$.pipe(
      distinctUntilChanged(
        (prev, curr) => prev.toLowerCase() === curr.toLowerCase()
      ),
      tap((_) => (this.isLoading = true)),
      switchMap((inputText: string) =>
        this.recipeService
          .searchRecipes(inputText)
          .pipe(finalize(() => (this.isLoading = false)))
      )
    );
  }

  public onSearch(searchQuery: string) {
    this.searchedQuery = searchQuery;
    this.inputText$.next(searchQuery);
  }
}
