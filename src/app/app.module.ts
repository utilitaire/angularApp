import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {BrowserModule,} from '@angular/platform-browser';  
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService } from "./services/auth.service";
import { User } from "./models/user.model";
import { firstValueFrom } from "rxjs";
import { WebReqInterceptor } from "./services/web-req.interceptor";

function appInitializer(authService: AuthService) {
  // return () => {
  //   return new Promise((resolve) => {
  //     authService.getUserinfo().subscribe().add(()=>resolve());
  //   });
  // };
  return () => firstValueFrom(authService.getUserinfo());
}


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      // useFactory: (service: AuthService) => () => { } ,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
