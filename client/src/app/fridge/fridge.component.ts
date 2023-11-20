import { Component, OnInit } from '@angular/core';
import { Ingredient, FridgeService } from '@services';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrls:['./fridge.component.scss']
})
export class FridgeComponent implements OnInit{
  constructor(private fridgeService: FridgeService) {
    this.getIngredients();
  }

  addedIngredients: Set<string> = this.fridgeService.getLocallyStoredIngredients();
  availableIngredients: string[] = [];
  apiIngredients: Ingredient[] = [];

  filteredItems: string[] = [];
  searchText = '';

  ngOnInit(): void {
    if (this.addedIngredients.has(""))
    {
      this.addedIngredients.clear()
    };    
  }

  private getIngredients(): void {
    this.fridgeService.getIngredientsData().subscribe(ingredients => {
      this.apiIngredients = ingredients as Ingredient[]
      this.availableIngredients = this.apiIngredients.map(ingredient => ingredient.name).sort();
    },
    (error) => console.error(error));
  }

  public addIngredient(ingredient: string): void {
    this.addedIngredients.add(ingredient);
    localStorage.setItem("userIngredients",Array.from(this.addedIngredients).toString());

    this.sortFilteredIngredients();
  }

  public deleteIngredient(ingredient: string): void {
    this.addedIngredients.delete(ingredient);
    localStorage.setItem("userIngredients",Array.from(this.addedIngredients).toString());

    this.sortFilteredIngredients();
  }

  public filterIngredients() {
    this.filteredItems = this.availableIngredients.filter(item =>
      item.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
    this.sortFilteredIngredients();
  }

  private sortFilteredIngredients()
  {
    const selectedIngredients = this.filteredItems.filter(item => this.addedIngredients.has(item)).sort();
    const unselectedIngredients = this.filteredItems.filter(item => !Array.from(this.addedIngredients).includes(item)).sort();

    this.filteredItems = selectedIngredients.concat(unselectedIngredients);
  }
}
