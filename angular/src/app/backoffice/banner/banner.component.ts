import { Component, OnInit } from '@angular/core';
import { Banner } from '../../model/banner';
import { BannerService } from '../../services/banner.service';
import { UsersService } from '../../services/users.service';
import { EnvironmentService } from '../../services/environment.service';
import { BaseComponent } from '../../services/BaseComponent';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { BannerImageComponent } from '../../components/banner-image/banner-image.component';

@Component({
  selector: 'app-banner',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MessageComponent,
    BannerImageComponent
  ],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers: [BannerService]
})
export class BannerComponent  extends BaseComponent  implements OnInit {

  newBanner: Banner = new Banner();
  banners: Banner[] = [];
  customMessage: string;
  showImage = true;
  constructor(private bannerService: BannerService,
    private userService: UsersService,
    private environment: EnvironmentService) {
    super();
  }

  ngOnInit() {
    this.userService.getObservableUser().subscribe({next: (user) => this.loadInitialData()});
  }

  loadInitialData() {
    if (this.userService.isBackofficeLoggedUser()) {
        this.bannerService.findAll().subscribe(banners => {
          this.banners = banners;
        }, () => this.showError());
      
    } else {
      this.banners = [];
    }
  }

  refresh() {
    this.bannerService.findAll().subscribe(banners => {
      this.banners = banners;
      this.showSuccess();
    }, () => this.showError());
  }
  
  deleteBanner(banner: Banner) {
    if (confirm('Seguro que desea borrar el alerta de precios ' + banner.id + '? ')) {
      this.bannerService.deleteBanner(banner.id).subscribe(() => {
        this.loadInitialData();
        this.showSuccess();
      }, () => this.showError());
    }
  }

  save(banner: Banner) {
    this.bannerService.save(banner).subscribe(result => {
      if (result === 'OK') {
        if (banner.id === undefined) {
          this.loadInitialData();
        }
        this.customMessage = 'El alerta de precios ' + banner.id + ' se guardó exitosamente';
        this.showSuccess();
        this.newBanner = new Banner();
      } else {
        console.log(result);
        this.showError();
      }
    }, () => this.showError());
  }

  edit(banner: Banner){
    this.newBanner = banner;
    this.gotoTop();
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  fileChange(event, banner: Banner) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (confirm('querés agregar la imagen? ' + banner.id)) {
        this.bannerService.uploadImage(file, banner  ).subscribe(
          data => {
            this.customMessage = 'La operación se realizó con éxito';
            this.showSuccess();
            this.refresh();
          },
          (error) => {console.log(error); this.showError();}
        );
      }
    }
  }
  newFileChange(event){
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (confirm('querés agregar la imagen? ')) {
        this.bannerService.uploadImage(file).subscribe(
          data => {
            this.newBanner.imagePath = data.path;
            console.log(data);
            this.customMessage = 'La operación se realizó con éxito';
            this.showSuccess();
            this.refresh();
          },
          (error) => {console.log(error); this.showError();}
        );
      }
    }
  }
}
