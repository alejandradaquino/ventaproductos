import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../../model/banner';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-banner-image',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.css']
})
export class BannerImageComponent implements OnInit {

  
  @Input()
  banner: Banner = new Banner();

  @Input()
  minHeight='200px';

  constructor(private environment: EnvironmentService) { }

  ngOnInit() {
  }

  getImage(banner: Banner): string {
    return this.environment.getBannerImageSrc(banner.imagePath);
  }
}
