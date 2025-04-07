import { Component } from '@angular/core';
import { ToastHelperService } from '../../services/toast-helper/toast-helper.service';

@Component({
  selector: 'app-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.css']
})
export class ToastDemoComponent {
  message: string = '';
  title: string = 'Demo Toast';

  constructor(private toastHelper: ToastHelperService) {}

  showSuccessToast() {
    this.toastHelper.displaySuccessToast(this.title, this.message);
  }

  showInfoToast() {
    this.toastHelper.displayInfoToast(this.title, this.message);
  }

  showWarningToast() {
    this.toastHelper.displayWarningToast(this.title, this.message);
  }

  showErrorToast() {
    this.toastHelper.displayErrorToast(this.title, this.message);
  }
}
