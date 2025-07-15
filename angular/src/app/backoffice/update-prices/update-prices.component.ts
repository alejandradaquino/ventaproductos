import { Component, OnInit } from '@angular/core';
import { PriceList } from '../../model/priceList';
import { PricelistService } from '../../services/pricelist.service';
import { UsersService } from '../../services/users.service';
import { BaseComponent } from '../../services/BaseComponent';
import { ArticlesService } from '../../services/articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-update-prices',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ],
  templateUrl: './update-prices.component.html',
  styleUrls: ['./update-prices.component.css'],
  providers: [ArticlesService, PricelistService]
})
export class UpdatePricesComponent  extends BaseComponent implements OnInit {

  priceLists: PriceList[] = [];
  updatePriceListList: PriceList = new PriceList();
  percentage = 0;

  constructor(private articleService: ArticlesService,
    private priceListService: PricelistService,
    private userService: UsersService) { super(); }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({ next: (user) => this.loadInitialData() });
  
  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.priceListService.findAll().subscribe(priceLists => {
        this.priceLists = priceLists;
        this.updatePriceListList = this.priceLists[0];
      }, () => this.showError());
      
    }
  }


  downloadCSV(){
    this.articleService.downloadCSV(this.updatePriceListList.id);
  }
  
  get sample(): number {
    return 10.0 * (this.percentage / 100 + 1);
  }


  updateAllPrices() {
    if (confirm('Está seguro que quiere actualizar todos los precios de la lista?')) {
      if(this.updatePriceListList.id>=0){

        this.articleService.updateAllPrices(this.percentage / 100 + 1, this.updatePriceListList.id).subscribe(() => {
          this.showResultOk('Se modificaron todos los precios');
        });
      }else{
        this.articleService.updateDefaultPrices(this.percentage / 100 + 1).subscribe(() => {
          this.showResultOk('Se modificaron todos los precios');
        });
      }
    }
  }
}
