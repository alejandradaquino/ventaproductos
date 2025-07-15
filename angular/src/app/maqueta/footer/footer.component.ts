import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Configuration } from '../../model/configuration';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone:true,        
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ContactService]
})
export class FooterComponent implements OnInit {


  @Input()
  wip = false;

  configuration:Configuration = new Configuration();
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.findConfiguration().subscribe(c=>this.configuration=c);
  }

}
