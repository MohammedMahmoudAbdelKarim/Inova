import { Component, OnInit } from "@angular/core";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { APIsService } from "../../../shared/services/apis.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ToastersService } from "../../../shared/services/toasters.service";
import { ServerResponse } from "../../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
})
export class NewsComponent implements OnInit {
  newsArray = [];
  constructor(private api: APIsService, private toasters: ToastersService) {}

  p: number = 1;

  ngOnInit() {
    this.api
      .GET("news", {
        "paging[page_size]": 20,
        "paging[page_number]": 1,
      })
      .subscribe((data) => {
        console.log(data);
        this.newsArray = data.body["data"];
      });
  }
}
