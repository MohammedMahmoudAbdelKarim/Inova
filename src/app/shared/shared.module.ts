import { CookieService } from "ngx-cookie-service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { RouterModule } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";
import { ProgressBarComponent } from "./components/progressBar/progressBar.component";
import { TranslateModule } from "@ngx-translate/core";
import { LottieModule } from "ngx-lottie";
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RouterModule,
    MatProgressBarModule,
    MatMenuModule,
    FormsModule,
    TranslateModule.forChild(),
    LottieModule,
    MatDialogModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ProgressBarComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // components
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ProgressBarComponent,
    MatDialogModule,
  ],
  providers: [CookieService],
})
export class SharedModule {}
