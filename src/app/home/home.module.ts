import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { TeamateComponent } from './teamate/teamate.component';

const config: SocketIoConfig = { url: "http://localhost:4000", options: {} };

@NgModule({
  imports: [SharedModule, HomeRoutingModule, SocketIoModule.forRoot(config)],
  declarations: [
    HomeComponent,
    TeamateComponent
  ],
  providers: [HomeAuthResolver],
})
export class HomeModule {}
