import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-attribute',
  templateUrl: './recipe-attribute.component.html',
  styleUrl: './recipe-attribute.component.scss',
})
export class RecipeAttributeComponent {
  @Input() icon!: string;
  @Input() text!: string;
}
