import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './error/error.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, ErrorComponent, RecipeDetailsComponent],
  imports: [CommonModule, MatIconModule],
  exports: [SpinnerComponent, ErrorComponent, RecipeDetailsComponent],
})
export class SharedModule {}
