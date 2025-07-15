import {Company} from '../../model/company';
import {PriceList} from '../../model/priceList';
import {CompanyService} from '../../services/company.service';
import {BaseComponent} from '../../services/BaseComponent';
import {PricelistService} from '../../services/pricelist.service';
import {UsersService} from '../../services/users.service';
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';
import { OrderByPipe } from '../../pipes/order-by.pipe';

@Component({
  selector: 'app-company',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent,
    OrderByPipe
  ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService, PricelistService]
})
export class CompanyComponent extends BaseComponent implements OnInit {
  companies: Company[] = [];
  newCompany: Company = new Company();
  priceLists: PriceList[] = [];
  newAddress: string;

  constructor(private companyService: CompanyService, private priceListService: PricelistService, private userService: UsersService) {
    super();
  }
  addAddress() {
    this.newCompany.add(this.newAddress);
    this.newAddress = '';
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: (user) => this.loadInitialData()});

  }
  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.companyService.findAll().subscribe(companies => {
        this.companies = companies;
      }, () => this.showError());

      this.priceListService.findAll().subscribe(priceLists => {
        this.priceLists = priceLists;
      }, () => this.showError());

    } else {
      this.companies = [];
      this.priceLists = [];
    }
  }
  refresh() {
    this.companyService.findAll().subscribe(companies => {
      this.companies = companies;
      this.showSuccess();
    }, () => this.showError());
  }

  save(company: Company) {
    this.companyService.save(company).subscribe(result => {
      if (result === 'OK') {
        this.showSuccess();
        this.refresh();
        this.newCompany = new Company();
      } else {
        console.log(result);
        this.showError();
      }
    }, () => this.showError());
  }

}
