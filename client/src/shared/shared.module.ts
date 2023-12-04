import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './components/error/error.component';
import { RecipeAttributeComponent } from './components/recipe-attribute/recipe-attribute.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HighlightPipe } from './pipes/highlight/highlight.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorComponent,
    RecipeDetailsComponent,
    RecipeAttributeComponent,
    HighlightPipe,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    SpinnerComponent,
    ErrorComponent,
    RecipeDetailsComponent,
    RecipeAttributeComponent,
    HighlightPipe,
  ],
})
export class SharedModule {}
