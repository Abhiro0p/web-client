import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastHelperService {

  constructor() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "4000",
      "hideDuration": "3000",
      "timeOut": "7000",
      "extendedTimeOut": "3000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  }

  displaySuccessToast(toastTitle: string, toastContent: string) {
    toastr.success(toastContent, toastTitle);
  }

  displayInfoToast(toastTitle: string, toastContent: string) {
    toastr.info(toastContent, toastTitle);
  }

  displayWarningToast(toastTitle: string, toastContent: string) {
    toastr.warning(toastContent, toastTitle);
  }

  displayErrorToast(toastTitle: string, toastContent: string) {
    toastr.error(toastContent, toastTitle);
  }

  displaySuccessToastUpperLeft(toastTitle: string, toastContent: string) {
    toastr.success(toastContent, toastTitle, {positionClass: "toast-top-left"});
  }

  displayInfoToastUpperLeft(toastTitle: string, toastContent: string) {
    toastr.info(toastContent, toastTitle, {positionClass: "toast-top-left"});
  }

  displayWarningToastUpperLeft(toastTitle: string, toastContent: string) {
    toastr.warning(toastContent, toastTitle, {positionClass: "toast-top-left"});
  }

  displayErrorToastUpperLeft(toastTitle: string, toastContent: string) {
    toastr.error(toastContent, toastTitle, {positionClass: "toast-top-left"});
  }

  displaySuccessToastUpperRight(toastTitle: string, toastContent: string) {
    toastr.success(toastContent, toastTitle, {positionClass: "toast-top-right"});
  }

  displayInfoToastUpperRight(toastTitle: string, toastContent: string) {
    toastr.info(toastContent, toastTitle, {positionClass: "toast-top-right"});
  }

  displayWarningToastUpperRight(toastTitle: string, toastContent: string) {
    toastr.warning(toastContent, toastTitle, {positionClass: "toast-top-right"});
  }

  displayErrorToastUpperRight(toastTitle: string, toastContent: string) {
    toastr.error(toastContent, toastTitle, {positionClass: "toast-top-right"});
  }
}
