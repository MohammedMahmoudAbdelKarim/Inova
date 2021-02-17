import { Injectable } from "@angular/core";
import { ToastersService } from "./toasters.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { DataShareService } from "./dataShare.service";
import { Observable } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { formValidation } from "./../constants";

@Injectable({
  providedIn: "root",
})
export class HandleErrorService {
  constructor(
    private toasters: ToastersService,
    private dataShare: DataShareService
  ) {}

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = `${err.status}: Bad Request.`;
          break;
        case 401:
          errorMessage = `${err.status}: You are unauthorized to do this action.`;
          break;
        case 403:
          errorMessage = `${err.status}: You don't have permission to access the requested resource.`;
          break;
        case 404:
          errorMessage = `${err.status}: The requested resource does not exist.`;
          break;
        case 412:
          errorMessage = `${err.status}: Precondition Failed.`;
          break;
        case 500:
          errorMessage = `${err.status}: Internal Server Error.`;
          break;
        case 503:
          errorMessage = `${err.status}: The requested service is not available.`;
          break;
        case 422:
          errorMessage = "Validation Error!";
          this.handleBackendValidations(err);
          break;
        default:
          errorMessage = `Something went wrong!`;
      }
    }
    if (errorMessage) {
      this.toasters.Error(errorMessage);
    }
  }

  // Displaying Forms Validation Messages
  public getFormValidationMessage(form: FormGroup, input: string): string {
    if (form.get(input).hasError("required")) {
      return "! هذا الحقل مطلوب";
    }
    if (form.get(input).hasError("email")) {
      return "برجاء اداخال البريد الالكترونى بشكل صحيح";
    }
    if (form.get(input).hasError("minlength")) {
      return `كلمة المرور على الاقل ${formValidation.minLength} حروف او ارقام`;
    }
  }

  // Form Validation Messages for *ngIf
  public showValidationError(form: FormGroup, input: string): boolean {
    return !form.get(input).valid && form.get(input).touched;
  }

  // Handling backend custom error messages
  public handleBackendValidations(error: HttpErrorResponse) {
    const errors = {};

    for (const key in error.error.errors) {
      if (Object.prototype.hasOwnProperty.call(error.error.errors, key)) {
        errors[key] = error.error.errors[key];
      }
    }
    // adding error obj to the global serverError Observable
    this.dataShare.addServerErrors(errors);
  }
}
