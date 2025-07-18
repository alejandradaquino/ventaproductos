import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user';
import { BaseComponent } from '../../services/BaseComponent';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule, MessageComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  user: User = new User();
  errorResult: string;

  @Input()
  rows = false;

  @Input()
  redirect = true;

  constructor(private userService: UsersService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.userService.login(this.user).subscribe(user => {
      this.user = user;
      if (this.redirect) {
        this.router.navigate(['/']);
      }
    }, error => {
      console.log(error);
      this.showMessage = error; 
      this.showError();
    });
  }

  get isLoggedUser(): boolean {
    return this.userService.isLoggedUser();
  }
}
