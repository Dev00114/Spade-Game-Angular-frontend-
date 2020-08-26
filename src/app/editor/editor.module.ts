import { ModuleWithProviders, NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';
import { OpentokService } from "../opentok.service";
import { PublisherComponent } from './publisher/publisher.component';
import { SubObjectComponent } from './subObject/subObject.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { DocumentListComponent } from "./documentList/documentList.component";
import { DocumentComponent } from "./document/document.component";
import { ChatComponent } from "./chat/chat.component";
import { SpadeGameComponent } from "./spadeGame/spadeGame.component";
import { FacebookshareComponent } from './facebookshare/facebookshare.component';
import { ShareURlComponent } from './shareURl/shareURl.component';
import { JwSocialButtonsModule } from "jw-angular-social-buttons";
import { ClockComponent } from './clock/clock.component';
import { AdsComponent } from './ads/ads.component';
import { Ads1Component } from './ads1/ads1.component';
import { AdsenseModule } from "ng2-adsense";


const config: SocketIoConfig = { url: "http://localhost:4000", options: {} };
console.log("sockentconfig",SocketIoModule.forRoot(config));

@NgModule({
  imports: [
    SharedModule,
    EditorRoutingModule,
    SocketIoModule.forRoot(config),
    JwSocialButtonsModule,
    AdsenseModule.forRoot(
      {
        adClient: 'ca-pub-7640562161899788',
        adSlot: 7259870550,
      }
    ),
  ],
  declarations: [
    EditorComponent,
    PublisherComponent,
    SubObjectComponent,
    DocumentListComponent,
    DocumentComponent,
    ChatComponent,
    SpadeGameComponent,
    FacebookshareComponent,
    ShareURlComponent,
    ClockComponent,
    AdsComponent,
    Ads1Component,
  ],
  providers: [EditableArticleResolver, OpentokService],
})
export class EditorModule {}
