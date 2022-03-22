import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "./pages/about/about-page.component";
import { HomeComponent } from "./pages/home/home-page.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { OnDemandPreloadStrategy } from "./shared/strategies/on-demand-preload.strategy";

const routes: Routes = [
  { path: "about-us", component: AboutPageComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin/admin.module").then((m) => m.AdminModule),
    data: { preload: true }
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: { preload: true },
  },
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: OnDemandPreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
