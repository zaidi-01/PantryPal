import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() public search: string = '';
  @Input() public placeholder: string = '';

  @Output() public searchChange = new EventEmitter<string>();

  onSearchChange(search: string) {
    this.searchChange.emit(search);
  }
}
