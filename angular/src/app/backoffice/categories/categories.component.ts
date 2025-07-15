import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoriesService } from '../../services/categories.service';
import { UsersService } from '../../services/users.service';
import { BaseComponent } from '../../services/BaseComponent';
import { Subcategory } from '../../model/subcategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-categories',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoriesService]
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = new Category();
  newSubcategory: Subcategory = new Subcategory();

  constructor(private categoriesService: CategoriesService, private userService: UsersService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: (user) => this.loadInitialData()});
  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.categoriesService.findAll().subscribe(categories =>{

        this.categories = categories;
      }, () => this.showError());
    } else {
      this.categories = [];
    }
  }
  refresh() {
    this.categoriesService.findAll().subscribe(categories => {
      this.categories = categories;
      this.showSuccess();
    }, () => this.showError());
  }

  save() {
    this.categoriesService.save(this.newCategory).subscribe(result => {
      if (result === 'OK') {
        this.showSuccess();
        this.refresh();
        this.newCategory = new Category();
      } else {
        console.log(result);
        this.showError();
      }
    }, () => this.showError());
  }
  edit(category: Category){
    this.newCategory = category;
    this.gotoTop();
  }
  delete(category: Category){
    if(confirm('Está seguro de borrar la categoría ' + category.name +'?')){
      this.categoriesService.delete(category).subscribe(result => {
        if (result === 'OK') {
          this.showSuccess();
          this.refresh();
        } else {
          console.log(result);
          this.showError();
        }
      }, () => this.showError());
    }
  }
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  addSubcategory(){
    this.newCategory.addSubcategory(this.newSubcategory);
    this.newSubcategory = new Subcategory();
  }
}
