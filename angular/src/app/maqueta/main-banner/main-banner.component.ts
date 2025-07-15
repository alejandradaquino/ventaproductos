import { BannerService } from '../../services/banner.service';
import { Banner } from '../../model/banner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BannerImageComponent } from '../../components/banner-image/banner-image.component';

@Component({
  selector: 'app-main-banner',
  standalone:true,
  imports:[CommonModule, BannerImageComponent],
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.css'],
  providers: [BannerService]
})
export class MainBannerComponent implements OnInit {

  banners: Banner[] = [];
  bannerShown = new Banner();
  interval: any;
  constructor(private bannerService: BannerService, private router: Router) { }

  startTimer() {
    this.interval = setInterval(this.nextBanner, 5000)
  }

  nextBanner= ()=> {
    if (this.banners.length === 0) {
      return;
    }
    let index = this.banners.indexOf(this.bannerShown);
    if (index=== -1 || index === this.banners.length-1) {
      this.bannerShown = this.banners[0];
    } else {
      this.bannerShown = this.banners[index+1];
    }
  };

  bannerClicked(banner:Banner){
    this.router.navigateByUrl(banner.url);
  }

  selectBanner(banner:Banner){
    this.bannerShown = banner;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  get selectedItem() {
    if(this.bannerShown===undefined){
      return '?';
    }
    return 'banner' + this.bannerShown.id;
  }

  ngOnInit() {
    this.bannerService.findBanners().subscribe(banners => {
      this.banners = banners;
      this.nextBanner();
    });
    this.startTimer();


  }

}
