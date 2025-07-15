import { Component, OnInit, Input } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';
import { Detail } from '../../model/detail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-image',
  standalone:true,        
  imports: [
    CommonModule
  ],
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.css']
})
export class DetailImageComponent implements OnInit {

  @Input()
  detail: Detail = new Detail();

  @Input()
  minHeight='200px';

  constructor(private environment: EnvironmentService) { }

  ngOnInit() {
  }

  getImage(detail: Detail): string {
    return this.environment.getArticleImageSrc(detail.imgPath);
  }
}
