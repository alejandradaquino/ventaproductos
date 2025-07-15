import { Component } from '@angular/core';
import { EnvironmentService } from './services/environment.service';
import { UsersService } from './services/users.service';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from './services/order.service';
import { CommonModule } from '@angular/common';
import { BannerHeaderComponent } from './maqueta/banner-header/banner-header.component';
import { SearchBarComponent } from './maqueta/search-bar/search-bar.component';
import { BackofficeLoginComponent } from './backoffice/backoffice-login/backoffice-login.component';
import { MenuComponent } from './maqueta/menu/menu.component';
import { MainBannerComponent } from './maqueta/main-banner/main-banner.component';
import { RandomArticlesComponent } from './maqueta/random-articles/random-articles.component';

@Component({
  selector: 'app-root',
  standalone: true,        
  imports: [
    CommonModule,           
    RouterModule,
    BannerHeaderComponent,
    SearchBarComponent,
    BackofficeLoginComponent,
    MenuComponent,
    MainBannerComponent,
    RandomArticlesComponent,            
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [OrderService] 
})
export class App {
  wip = false;

  constructor(
    public environment: EnvironmentService,
    private router: Router
  ) { }

  select(url: string) {
    this.environment.urlRest = url;
  }

  get showBackoffice(): boolean {
    return this.router.url.startsWith('/backoffice');
  }

  get showMainBanner(): boolean {
    return this.router.url === '/';
  }

  get showButtons(): boolean {
    return this.router.url === '/';
  }

  goToBackoffice() {
    window.location.href = '/backoffice';
  }
}
