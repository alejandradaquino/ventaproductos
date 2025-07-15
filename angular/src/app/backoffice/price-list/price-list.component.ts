import {BaseComponent} from '../../services/BaseComponent';
import {PriceList} from '../../model/priceList';
import {PricelistService} from '../../services/pricelist.service';
import {UsersService} from '../../services/users.service';
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-price-list',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ],
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css'],
  providers: [PricelistService]
})
export class PriceListComponent extends BaseComponent implements OnInit {
  priceLists: PriceList[] = [];
  newPriceList: PriceList = new PriceList();

  constructor(private priceListService: PricelistService, private userService: UsersService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: (user) => this.loadInitialData()});
  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {

      this.priceListService.findAll().subscribe({
        next: (lists) => this.priceLists = lists,
        error: () =>this.showError()
      });
    } else {
      this.priceLists = [];
    }
  }
  refresh() { 
     this.priceListService.findAll().subscribe({
        next: (lists) => {
          this.priceLists = lists
          this.showSuccess();
         },
        error: () =>this.showError()
      });
  }

  save(priceList: PriceList) {
    this.priceListService.save(priceList).subscribe({
      next: (result) => {
        if (result === 'OK') {
          this.showSuccess();
          this.refresh();
          this.newPriceList = new PriceList();
        } else {
          console.log(result);
          this.showError();
        }
      },
    error: () => this.showError()});
  }
}
