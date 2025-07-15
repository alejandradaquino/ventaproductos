import { Article } from '../../model/article';
import { PriceList } from '../../model/priceList';
import { BaseComponent } from '../../services/BaseComponent';
import { ArticlesService } from '../../services/articles.service';
import { EnvironmentService } from '../../services/environment.service';
import { PricelistService } from '../../services/pricelist.service';
import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subcategory } from '../../model/subcategory';
import { Category } from '../../model/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';
import { ArticleImageComponent } from '../../components/article-image/article-image.component';
import { ArticlesPipe } from '../../pipes/articles.pipe';

@Component({
  selector: 'app-articles',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent,
    ArticleImageComponent,
    ArticlesPipe
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticlesService, PricelistService, EnvironmentService, CategoriesService]
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  newArticle: Article = new Article();
  articles: Article[] = [];
  priceLists: PriceList[] = [];
  priceList: PriceList = new PriceList();
  filterArticle: Article = new Article({ categoryId: "" });
  showImage = false;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  customMessage = 'La operación se realizó con éxito';

  constructor(private articleService: ArticlesService,
    private priceListService: PricelistService,
    private userService: UsersService,
    private categoriesService: CategoriesService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({ next: (user) => this.loadInitialData() });
  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.articleService.findAll().subscribe(articles => this.articles = articles, () => this.showError());
      this.priceListService.findAll().subscribe(priceLists => {
        this.priceLists = priceLists;
        this.priceList = this.priceLists[0];
      }, () => this.showError());
      this.categoriesService.findAll().subscribe(categories => this.categories = categories, () => this.showError());
    } else {
      this.articles = [];
      this.priceLists = [];
    }
  }
  refresh() {
    this.articleService.findAll().subscribe(articles => {
      this.articles = articles;
      this.customMessage = 'La operación se realizó con éxito';
      this.showSuccess();
    }, (error) => {alert(error);this.showError()});
  }

  

  deleteArticle(article: Article) {
    if (confirm('Seguro que desea borrar el artículo ' + article.code + '? ')) {
      this.articleService.deleteArticle(article.id).subscribe(() => {
        this.loadInitialData();
        this.showSuccess();
      }, () => this.showError());
    }
  }

  edit(article: Article) {
    this.newArticle = article;
    this.categoryChanged({});
    this.gotoTop();
  }

  findCategoryName(id: number): string {
    let category = this.categories.find(c => c.id === id);
    if(category === undefined){
      return "";
    }
    return category.name;
  }
  findSubcategoryName(categoryId: number, subcategoryId: number): string {
    if(subcategoryId===undefined || subcategoryId <=0 || this.categories.length === 0){
      return '';
    }
    let subcategory = this.categories.find(c => c.id === categoryId).subcategories.find(s => s.id === subcategoryId)
    return subcategory?subcategory.name:"";
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  save(article: Article) {
    let validation = article.validate();
    if (validation === '') {
      this.articleService.save(article).subscribe(result => {
        if (result === 'OK') {
          if (article.id === undefined) {
            this.refresh();
          }
          this.customMessage = 'El artículo ' + article.code + ' se guardó exitosamente';
          this.showSuccess();
          this.newArticle = new Article();
        } else {
          console.log(result);
          this.showError();
        }
      }, () => this.showError());
    } else {
      alert(validation);
    }
  }

  fileChange(event, article: Article) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (confirm('querés agregar la imagen? ' + article.name)) {
        this.articleService.uploadImage(file, article).subscribe(
          data => {
            this.customMessage = 'La operación se realizó con éxito';
            this.showSuccess();
            this.refresh();
          },
          (error) => { console.log(error); this.showError(); }
        );
      }
    }
  }

  
  newFileChange(event){
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (confirm('querés agregar la imagen? ')) {
        this.articleService.uploadImage(file).subscribe(
          data => {
            this.newArticle.imgPath = data.path;
            console.log(data);
            this.customMessage = 'La operación se realizó con éxito';
            this.showSuccess();
          },
          (error) => {console.log(error); this.showError();}
        );
      }
    }
  }

  categoryChanged(_) {
    this.subcategories = this.categories.find(c => c.id == this.newArticle.categoryId).subcategories;
  }

  clearArticle() {
    this.newArticle = new Article();
  }
}
