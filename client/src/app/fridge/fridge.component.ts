import { Component, OnInit } from '@angular/core';
import { FridgeService } from '@services';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrls:['./fridge.component.scss']
})
export class FridgeComponent implements OnInit{
  constructor(private fridgeService: FridgeService) {}

  addedIngredients: Set<string> = this.fridgeService.getLocallyStoredIngredients();
  availableIngredients = this.fridgeService.getAvailableIngredients();

  filteredItems: string[] = [];
  searchText = '';

  ngOnInit(): void {
    if (this.addedIngredients.has(""))
    {
      this.addedIngredients.clear()
    };
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
    console.log(this.searchText);
    this.filteredItems = this.availableIngredients.filter(item =>
      item.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
    this.sortFilteredIngredients();
  }

  private sortFilteredIngredients()
  {
    const selectedIngredients = [...this.filteredItems].filter(item => this.addedIngredients.has(item)).sort();
    const unselectedIngredients = [...this.filteredItems].filter(item => !Array.from(this.addedIngredients).includes(item)).sort();

    this.filteredItems = selectedIngredients.concat(unselectedIngredients);
  }
}
