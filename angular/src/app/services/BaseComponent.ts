import { Injectable } from "@angular/core";

@Injectable()
export abstract class BaseComponent {
  saveSuccess = false;
  showMessage = false;
  saveError = false;
  loading = false;
  showResult = false;
  resultMessage = '';

  showResultOk(msg: string) {
    this.showResult = true;
    this.resultMessage = msg;
    setTimeout(() => {
      this.showResult = false;
    }, 4000);
  }

  showSuccess() {
    this.showMessage = true;
    this.saveSuccess = true;
    this.saveError = false;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }
  showError() {
    this.showMessage = true;
    this.saveSuccess = false;
    this.saveError = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }
  
}