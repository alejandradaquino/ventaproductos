import { CommonModule } from '@angular/common';
import {User} from '../../model/user';
import {BaseComponent} from '../../services/BaseComponent';
import {UsersService} from '../../services/users.service';
import {Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';
@Component({
  selector: 'app-backoffice-login',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ],
  templateUrl: './backoffice-login.component.html',
  styleUrls: ['./backoffice-login.component.css']
})
export class BackofficeLoginComponent extends BaseComponent implements OnInit {

  user: User;

  constructor(private userService: UsersService) {
    super();
  }

  ngOnInit() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.user = this.userService.getLoggedUser();
    } else {
      this.user = new User({idCompany: 0});
    }
  }
  get showMenu(): boolean {
    return this.userService.isBackofficeLoggedUser();
  }
  get showFullAdmin(){
    return this.user.isFullAdmin();
  }

  login() {
    this.userService.login(this.user).subscribe(user => {
      this.user = user;
      if (!this.user.isBackoffice()) {
        this.showResultOk("No tiene permisos para acceder a esta p&aacute;gina");
      }
    }, error => {
      console.log(error);
      this.showResultOk(error.error.status);
    });
  }

  logout() {
    this.userService.logout();
  }

  get isLoggedUser(): boolean {
    return this.userService.isBackofficeLoggedUser();
  }
}
