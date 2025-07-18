import { Routes } from '@angular/router';
import { LoginBackofficeComponent } from './backoffice/login-backoffice/login-backoffice.component';
import { ArticlesComponent } from './backoffice/articles/articles.component';
import { PriceListComponent } from './backoffice/price-list/price-list.component';
import { CompanyComponent } from './backoffice/company/company.component';
import { UsersComponent } from './backoffice/users/users.component';
import { CategoriesComponent } from './backoffice/categories/categories.component';
import { LastOrdersComponent } from './backoffice/last-orders/last-orders.component';
import { UpdatePricesComponent } from './backoffice/update-prices/update-prices.component';
import { BannerComponent } from './backoffice/banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './maqueta/login/login.component';
import { CartComponent } from './cart/cart.component';
import { CompanyCatalogComponent } from './company-catalog/company-catalog.component';
import { ArticleComponent } from './maqueta/article/article.component';
import { CompanyLastOrdersComponent } from './company-last-orders/company-last-orders.component';
import { SearchResultComponent } from './maqueta/search-result/search-result.component';

export const routes: Routes = [ 
  {path: 'backoffice', component: LoginBackofficeComponent},
  {path: 'backoffice/articles', component: ArticlesComponent},
  {path: 'backoffice/priceLists', component: PriceListComponent},
  {path: 'backoffice/companies', component: CompanyComponent},
  {path: 'backoffice/users', component: UsersComponent},
  {path: 'backoffice/categories', component: CategoriesComponent},
  {path: 'backoffice/pedidos', component: LastOrdersComponent},
  {path: 'backoffice/actualizarPrecios', component: UpdatePricesComponent},
  {path: 'backoffice/banners', component: BannerComponent},
  {path: 'profile', component: ProfileComponent },
  {path: 'login', component: LoginComponent},
  {path: 'backoffice/profile', component: ProfileComponent},
  {path: 'pedido', component: CartComponent},
  {path: 'category/:categoryId/:name', component: CompanyCatalogComponent},
  {path: 'articulo/:articuloId/:name', component: ArticleComponent},
  {path: 'subcategory/:subcategoryId/:name', component: CompanyCatalogComponent},
  {path: 'ultimospedidos', component: CompanyLastOrdersComponent},
  {path: 'search/:value', component: SearchResultComponent}

  ];
