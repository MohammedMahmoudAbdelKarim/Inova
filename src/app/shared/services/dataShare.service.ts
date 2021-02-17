import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Duration } from "../enums/enums.enum";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class DataShareService {
  constructor(
    private cf: CommonFunctionsService,
    private cookieService: CookieService
  ) {}

  loaderSubject = new BehaviorSubject(false);
  public loader$ = this.loaderSubject.asObservable();

  userSubject = new BehaviorSubject(null);
  public user$ = this.userSubject.asObservable();

  serverErrorsSubject = new BehaviorSubject(null);
  public serverErrors$ = this.serverErrorsSubject.asObservable();

  // Loader
  enableLoader() {
    this.loaderSubject.next(true);
  }
  disableLoader() {
    this.loaderSubject.next(false);
  }

  // Server Errors
  addServerErrors(errors) {
    this.serverErrorsSubject.next(errors);
  }
  removeServerErrors() {
    // remove server errors in every ng on init form component
    this.serverErrorsSubject.next(null);
  }

  getUser(user) {
    return user ? user : null;
  }

  saveUser(key, value) {
    this.cookieService.set(key, value);
  }

  removeUser() {
    this.userSubject.next(null);
    this.cf.deleteCookie("jwt");
  }
}
