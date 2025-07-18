import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone:true,        
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  searchValue: string;

  ngOnInit() {
  }

  onEnterPressed(){
    this.router.navigate(['/search', this.searchValue]);
  }
}
