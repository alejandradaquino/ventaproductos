import { CommonModule } from '@angular/common';
import {Company} from '../../model/company';
import {User} from '../../model/user';
import {BaseComponent} from '../../services/BaseComponent';
import {CompanyService} from '../../services/company.service';
import {UserAdminService} from '../../services/user-admin.service';
import {UsersService} from '../../services/users.service';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';
import { UsersPipe } from '../../pipes/users.pipe';

@Component({
  selector: 'app-users',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent,
    UsersPipe
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [CompanyService, UserAdminService]
})
export class UsersComponent extends BaseComponent implements OnInit {
  newUser: User = new User({idCompany:2});
  users: User[] = [];
  filterUser: User = new User( {idCompany:""} );
  companies: Company[];
  selectedCompany: Company;
  viewDeleted = false;
  constructor(private companyService: CompanyService, private userAdminService: UserAdminService, private userService: UsersService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: (user) => this.loadInitialData()});

  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
      this.companyService.findAll().subscribe(
        companies => {
          this.companies = companies;
          if (companies.length > 0) {
            this.selectedCompany = companies[0];
            this.newUser.idCompany = this.selectedCompany.id;
            this.searchUsers();
          }
        }
      );
    } else {
      this.companies = [];
      this.users = [];
    }
  }
  searchUsers() {
    this.userAdminService.findUsers(this.selectedCompany.id, this.viewDeleted).subscribe(users => this.users = users, this.showError);
  }

  disable(user: User) {
    this.userAdminService.disable(user.id).subscribe(() => {
      user.deleted = true;
      this.showSuccess();
      this.searchUsers();
    }, this.showError);
  }

  reenable(user: User) {
    this.userAdminService.reenable(user.id).subscribe(() => {
      user.deleted = false;
      this.showSuccess();
      this.searchUsers();
    }, this.showError);
  }
  
  resetUserPassword(user: User) {
    this.userAdminService.resetUserPassword(user.id).subscribe(() => {
      user.deleted = false;
      this.showSuccess();
      this.searchUsers();
    }, this.showError);
  }
  
  

  save(user: User) {
    this.userAdminService.save(user).subscribe(result => {
      if (result === 'OK') {
        this.showSuccess();
        this.searchUsers();
        this.newUser = new User({idCompany:2});
      } else {
        console.log(result);
        this.showError();
      }
    }, () => this.showError());
  }
}
