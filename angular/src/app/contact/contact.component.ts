import { CommonModule } from '@angular/common';
import {Company} from '../model/company';
import {Configuration} from '../model/configuration';
import {Message} from '../model/message';
import {BaseComponent} from '../services/BaseComponent';
import {ContactService} from '../services/contact.service';
import {UsersService} from '../services/users.service';
import {Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../components/message/message.component';

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent extends BaseComponent implements OnInit {

  @Input()
  company: Company;
  message: Message;
  configuration: Configuration= new Configuration();
  constructor(private contactService: ContactService, private userService: UsersService) {
    super();
  }

  ngOnInit() {
    this.message = new Message();
    this.message.companyname = this.company.name;
    this.message.username = this.userService.getLoggedUser().fullName;
    this.contactService.findConfiguration().subscribe(config => this.configuration = config);
  }

  sendMessage() {
    this.contactService.sendMessage(this.message).subscribe(() => {
      this.showSuccess();
      this.message = new Message();
      this.message.companyname = this.company.name;
      this.message.username = this.userService.getLoggedUser().fullName;
    });
  }
}
