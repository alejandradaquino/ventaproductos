import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkboxlists',
  standalone:true,        
  imports: [
    CommonModule
  ],
  templateUrl: './checkboxlists.component.html',
  styleUrls: ['./checkboxlists.component.css']
})
export class CheckboxlistsComponent implements OnInit {
  @Input() title: string;
  @Input() allItems: string[];
  @Input() selectedItems: string[];
  @Input() allNames: string[];
  @Input() disabled: boolean = false;
  @Input() cols: string = 'col-md-1';
  itemsSelected: Map<string, boolean> = new Map();
  constructor() { }

  ngOnInit() {
  }

  updateCheckedOptions(option, event) {
    this.itemsSelected.set(option, event.target.checked);
  }

  getSelectedItems(): string[] {
    let items: string[] = [];
    this.allItems.forEach((item, index) => {
      if (this.itemsSelected.get(item)) {
        items.push(item);
      }
    });
    return items;
  }

  setSelectedItems(items: string[]) {
    items.forEach((item, index) => {
      this.itemsSelected.set(item, true);
    });
  }
}
