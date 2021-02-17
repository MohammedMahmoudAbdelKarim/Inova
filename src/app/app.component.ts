import { Component, OnInit } from "@angular/core";
import { DataShareService } from "./shared/services/dataShare.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  direction: string;
  lang: string;
  constructor(
    public dataShare: DataShareService,
    public translate: TranslateService,
    private cf: CommonFunctionsService
  ) {}
  loader$: Observable<boolean> = this.dataShare.loader$.pipe(delay(0));

  ngOnInit() {}

  onRouterChange() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
