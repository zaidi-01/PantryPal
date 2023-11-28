import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [SpinnerComponent, ErrorComponent],
  imports: [CommonModule, MatIconModule],
  exports: [SpinnerComponent, ErrorComponent],
})
export class SharedModule {}
