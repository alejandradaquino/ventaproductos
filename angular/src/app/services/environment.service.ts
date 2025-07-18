import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Banner } from '../model/banner';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public imgSrc = 'https://alejandrajuarezdaquino.com.ar/';
  //public url = 'http://alfersistemas.com.ar/cercana/';
  public url = 'https://alejandrajuarezdaquino.com.ar/';
  public urlRest = this.url + 'rest/';

  findArticle(id): string {
    return this.urlRest + 'articleController.php?mode=id&id=' + id;
  }

  findArticleFromCatalog(id: number): string {
    return this.urlRest + 'catalogController.php?mode=findById&id=' + id;
  }

  downloadCSV(idPriceList: number): string {
    return this.urlRest + 'downloadPriceListController.php?idPriceList=' + idPriceList;
  }

  deleteArticle(id): string {
    return this.urlRest + 'articleController.php?mode=delete&id=' + id;
  }

  saveArticle(): string {
    return this.urlRest + 'articleController.php?mode=save';
  }

  findAllArticles(): string {
    return this.urlRest + 'articleController.php?mode=all';
  }
  updateAllPrices(percentage: number, idPriceList: number): string {
    return this.urlRest + 'articleController.php?mode=prices&percentage=' + percentage + '&idPriceList=' + idPriceList;
  }

  updateDefaultPrices(percentage: number) {
    return this.urlRest + 'articleController.php?mode=defaultprices&percentage=' + percentage;
  }

  findCatalogArticles(): string {
    return this.urlRest + 'catalogController.php';
  }

  findAllPriceLists(): string {
    return this.urlRest + 'priceListController.php?mode=all';
  }

  savePriceList(): string {
    return this.urlRest + 'priceListController.php?mode=save';
  }

  findAllCompanies(): string {
    return this.urlRest + 'companyController.php?mode=all';
  }

  findCompany(id: number): string {
    return this.urlRest + 'companyController.php?mode=find&id=' + id;
  }

  saveCompany(): string {
    return this.urlRest + 'companyController.php?mode=save';
  }

  findAllUsers(idCompany: number, viewDeleted: boolean): string {
    return this.urlRest + 'userController.php?mode=all&idCompany=' + idCompany + '&viewDeleted=' + viewDeleted;
  }

  saveOrder(): string {
    return this.urlRest + 'orderController.php';
  }

  findAllOrders(): string {
    return this.urlRest + 'orderController.php?mode=all';
  }

  findOrdersByCompany(companyId: number): string {
    return this.urlRest + 'orderController.php?mode=company&companyId=' + companyId;
  }

  saveUser(): string {
    return this.urlRest + 'userController.php?mode=save';
  }

  deleteUser(userId: number): string {
    return this.urlRest + 'userController.php?mode=delete&id=' + userId;
  }

  reenableUser(userId: number): string {
    return this.urlRest + 'userController.php?mode=reenable&id=' + userId;
  }

  changeUserPassword(): string {
    return this.urlRest + 'changePasswordController.php';
  }

  resetUserPassword(userId: number): string {
    return this.urlRest + 'changePasswordController.php?userId=' + userId;
  }

  userLogin() {
    return this.urlRest + 'loginController.php';
  }

  uploadArticleImage(article: Article) {
    if (article != null) {
      return this.urlRest + 'uploadArticleImage.php?id=' + article.id;
    } else {
      return this.urlRest + 'uploadNewArticleImage.php';
    }
  }

  getContactUrl() {
    return this.urlRest + 'contactController.php';
  }

  getArticleImageSrc(imgPah: string) {
    return this.imgSrc + imgPah;
  }

  getBannerImageSrc(imagePath:string){
    return this.imgSrc + imagePath;
  }
  
  findAllCategories(): string {
    return this.urlRest + 'catalogController.php?mode=categories';
  }

  saveCategory(): string {
    return this.urlRest + 'categoriesController.php';
  }

  deleteCategory(id: number): string {
    return this.urlRest + 'categoriesController.php?mode=delete&id=' + id;
  }

  findAllArticlesByCategory(categoryId: number): string {
    return this.urlRest + 'catalogController.php?mode=filter&categoryId=' + categoryId;
  }

  findAllArticlesBySubcategory(subcategoryId: number): string {
    return this.urlRest + 'catalogController.php?mode=filter&subcategoryId=' + subcategoryId;
  }

  findAllArticlesBy(value) {
    return this.urlRest + 'catalogController.php?mode=search&value=' + value;
  }

  findRandomArticles(): string {
    return this.urlRest + 'catalogController.php?mode=random';
  }

  findBanners() {
    return this.urlRest + 'bannerController.php?mode=findactive';
  }
  findAllBanners() {
    return this.urlRest + 'bannerController.php?mode=findall';
  }

  deleteBanner(id): string {
    return this.urlRest + 'bannerController.php?mode=delete&id=' + id;
  }

  saveBanner(): string {
    return this.urlRest + 'bannerController.php?mode=save';
  }

  uploadBannerImage(banner: Banner) {
    if (banner != null) {
      return this.urlRest + 'uploadBannerImage.php?id=' + banner.id;
    } else {
      return this.urlRest + 'uploadBannerImage.php';
    }


  }
}
