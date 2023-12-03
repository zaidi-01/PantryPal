import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '@interfaces';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class IngredientComponent {
  @Input() public isInFridge!: boolean;
  @Input() public ingredient!: Ingredient;

  @Output() public addIngredient = new EventEmitter();
  @Output() public removeIngredient = new EventEmitter();

  onAdd() {
    this.addIngredient.emit();
  }

  onRemove() {
    this.removeIngredient.emit();
  }
}
