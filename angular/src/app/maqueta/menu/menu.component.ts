import { Component, OnInit, Input } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Category } from '../../model/category';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-menu',
  standalone:true,
  imports:[
    CommonModule,
    RouterModule,
    MobileMenuComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [CatalogService]
})
export class MenuComponent implements OnInit {

  public categories: Category[] = []
  isBackofficeUser = false;

  @Input()
  shown:boolean = false;
  constructor(private catalogService: CatalogService, private userService: UsersService) { }

  ngOnInit() {
    this.isBackofficeUser = this.userService.isBackofficeLoggedUser();
    this.userService.getObservableUser().subscribe({next: user => {
      this.isBackofficeUser = user.isBackoffice();
    }});
    if(this.shown){
      this.catalogService.findCategories().subscribe(categories => this.categories = categories);
    }
  }

}
