import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-backoffice',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login-backoffice.component.html',
  styleUrls: ['./login-backoffice.component.css']
})
export class LoginBackofficeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
