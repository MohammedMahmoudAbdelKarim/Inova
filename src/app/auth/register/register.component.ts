import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { HttpResponse } from "@angular/common/http";
import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { APIsService } from "src/app/shared/services/apis.service";
import { ToastersService } from "src/app/shared/services/toasters.service";
import { Router } from "@angular/router";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { formValidation } from "./../../shared/constants";
import { ServerResponse } from "http";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    dob: new FormControl(""),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(9),
    ]),
  });

  constructor(
    private router: Router,
    private api: APIsService,
    private dataShare: DataShareService,
    private handleError: HandleErrorService,
    private toaster: ToastersService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
  }

  serverErrors$: Observable<any> = this.dataShare.serverErrors$;
  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;

  ngOnInit() {}

  submit(form) {
    console.log(form);
    var deviceID = MediaDeviceInfo["deviceId"]
      ? MediaDeviceInfo["deviceId"]
      : "";
    this.api
      .POST("users/signup?device_id=" + deviceID, form)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        console.log(res);
        this.toaster.Success("Welcome " + form.name);
        this.router.navigateByUrl("/home");
      });
  }
}
