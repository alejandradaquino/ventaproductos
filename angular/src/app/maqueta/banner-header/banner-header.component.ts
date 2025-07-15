import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-header.component.html',
  styleUrls: ['./banner-header.component.css']
})
export class BannerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
