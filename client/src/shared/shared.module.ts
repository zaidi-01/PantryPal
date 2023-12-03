import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './components/error/error.component';
import { RecipeAttributeComponent } from './components/recipe-attribute/recipe-attribute.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorComponent,
    RecipeDetailsComponent,
    RecipeAttributeComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    SpinnerComponent,
    ErrorComponent,
    RecipeDetailsComponent,
    RecipeAttributeComponent,
  ],
})
export class SharedModule {}
