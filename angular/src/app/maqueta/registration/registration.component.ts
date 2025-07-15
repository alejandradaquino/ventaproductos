import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../model/user';
import { BaseComponent } from '../../services/BaseComponent';
import { UserAdminService } from '../../services/user-admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-registration',
  standalone:true,
  imports:[CommonModule, FormsModule, MessageComponent,],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserAdminService]
})
export class RegistrationComponent extends BaseComponent implements OnInit {
  registrationSent: boolean = false;
  user: User = new User();
  constructor(private router: Router, private userAdminService: UserAdminService) {
    super();
  }

  ngOnInit() {
  }

  save() {
    this.userAdminService.save(this.user).subscribe(result => {
      if (result === 'OK') {
        this.registrationSent = true;
      } else {
        alert(result);
      }
    }, () => this.showError());
  }
}
