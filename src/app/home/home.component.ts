import {Component, ElementRef,AfterViewInit,ViewChild,Input} from "@angular/core";
import { OpentokService } from "../opentok.service";
import { Router } from '@angular/router';
import {AuthService} from '../core/services/auth.service';
import { SendmailService } from '../core/services/sendmail.service';
import { MultimailService } from '../core/services/multimail.service';
import { TeamateService } from '../core/services/teamate.service';
import { DateTime } from 'luxon';
import * as $ from 'jquery';

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("publisherDiv") publisherDiv: ElementRef;
  @ViewChild("publishersDiv") publishersDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishers: OT.Publisher;
  publishing: Boolean;
  constructor(
    private router: Router,
    private opentokService: OpentokService,
    public authService: AuthService,
    private Sendmails: SendmailService,
    private multimail: MultimailService,
    private teamate: TeamateService
  ) {}

  handler: any = null;

  ngOnInit() {
    this.multimail.init();
    this.multiemail();
    this.localStripe();
    this.setDate();
  }

  setDate(){
    const now = new Date();
    const timezone = now.getTimezoneOffset();
    if(timezone == 720){
      // alert("GMT + 2")
    }
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: "append",
      width: "100%",
      height: "1000px",
    });
    this.publishers = OT.initPublisher(this.publishersDiv.nativeElement, {
      insertMode: "append",
      width: "150px",
      height: "150px",
    });
    if (this.session) {
      if (this.session["isConnected"]()) {
        this.publish();
      }
      this.session.on("sessionConnected", () => this.publish());
    }
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

  create_game_info() {
    this.multimail.create_game_info();
    this.localTime();
  }

  config_setting() {
    this.multimail.config_setting();
  }

  cancel() {
    this.multimail.cancel();
  }

  go_to_page() {
    this.multimail.go_to_page();
    setTimeout(() => {
      this.sendmails();
    }, 5000);
  }

  // to create payment
  pay(amount) {
    this.multimail.pay(amount);
  }

  localStripe() {
    this.multimail.localStripe();
  }

  payment_close() {
    this.multimail.payment_close();
  }

  //multiplaery send email
  multiemail() {
    this.multimail.multiemail();
  }

  sendmails() {
    // const receivermails = localStorage.getItem("mails");
    const teammatemail = localStorage.getItem("teammate");
    const teaminvite = localStorage.getItem("teaminvite");
    const opponentmail = localStorage.getItem("opponentmail");
    const opponentTeamate = localStorage.getItem("opponentTeammate");
    const shareurl = location.href;
    this.Sendmails.sendMail(teammatemail, teaminvite, opponentmail, opponentTeamate, shareurl);
  }

  localTime() {
    this.multimail.localTime();
  }

  focus() {
    this.teamate.focus();
  }

  focusout() {
    this.teamate.focusout();
  }

  onefocusout() {
    const teamatemail = $("#teamate").val();
    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(teamatemail)) {
      $("#teaminvite").attr("disabled", false);
    } else {
      $("#teaminvite").attr("disabled", true);
      $("#teaminvite").val("Input correctly in Teamate!");
      $("#teamate").val("invailed");
      $("#teamate").css({ borderColor: "red", color: "red" });
      setTimeout(() => {
        $("#teamate").css({ borderColor: "white", color: "white" });
        $("#teamate").val("");
        $("#teaminvite").val("");
      }, 2000);
    }
  }

  twofocusout() {
    const opponentmail = $("#opponent").val();
    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(opponentmail)) {
    } else {
      $("#opponent").val("invalid");
      $("#opponent").css({ borderColor: "red", color: "red" });
      setTimeout(() => {
        $("#opponent").css({ borderColor: "white", color: "white" });
        $("#opponent").val("");
      }, 2000);
    }
  }

  threefocusout() {
    const opponentTeamate = $("#opponentTeamate").val();
    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(opponentTeamate)) {
    } else {
      $("#opponentTeamate").val("invalid");
      $("#opponentTeamate").css({ borderColor: "red", color: "red" });
      setTimeout(() => {
        $("#opponentTeamate").css({ borderColor: "white", color: "white" });
        $("#opponentTeamate").val("");
      }, 2000);
    }
  }
}

