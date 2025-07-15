import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { RouterModule } from '@angular/router';
import { OrderPreviewComponent } from '../order-preview/order-preview.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule,RouterModule, OrderPreviewComponent, SearchComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  user: User;

  @Input()
  wip = false;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: user => {
      this.user = user;
    }});
  }
  get isLoggedUser(): boolean {
    return this.userService.isLoggedUser();
  }

  logout() {
    this.userService.logout();
  }

}
