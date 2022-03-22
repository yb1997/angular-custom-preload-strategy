import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "./login/login-page.component";

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  exports: [],
  declarations: [LoginPageComponent],
  providers: [],
})
export class AuthModule {}
