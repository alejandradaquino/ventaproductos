import { CommonModule } from '@angular/common';
import {User} from '../model/user';
import {BaseComponent} from '../services/BaseComponent';
import {UserAdminService} from '../services/user-admin.service';
import {UsersService} from '../services/users.service';
import {Component, Injectable, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../components/message/message.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule, MessageComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserAdminService]
})
export class ProfileComponent extends BaseComponent implements OnInit {

  oldPassword: string;x
  newPassword: string;
  newPasswordRepeat: string;
  user: User = new User();
  constructor(private userService: UsersService, private userAdminService: UserAdminService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({
      next: user => {
        this.user = user;
        this.newPassword = '';
        this.oldPassword = '';
        this.newPasswordRepeat = '';
      }
    });
  }
  get newPasswordMatches() {return this.newPassword === this.newPasswordRepeat};
  save() {
    const isValidPassword = this.oldPassword === this.user.password;
    if (!isValidPassword) {
      alert('La contraseña es incorrecta');
      return;
    } if (!this.newPasswordMatches) {
      alert('La nueva contraseña y el reingreso de la nueva contraseña no coinciden');
      return;
    }
    this.userAdminService.changePassword(this.oldPassword, this.newPassword, this.user.id).subscribe(() => this.showSuccess(), () => this.showError());
  }

  get isLoggedUser() {
    return this.userService.isLoggedUser();
  }
}
