import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router'
import { from } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class MultimailService {
  handler    : any = null;
  localTimes : any;
  min        : number

  constructor(private router: Router) {}
  multiemail() {

  }

  localStripe() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: "pk_test_aeUUjYYcx4XNfKVW60pmHTtI",
          locale: "auto",
          token: function (token: any) {
            console.log(token);
            alert("success payment");
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }

  payment_close() {
    $("#payment").css("display", "none");
  }

  pay(amount) {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_live_65sPTfXZWDCX3nI43Oht8qaF00zD1M5gJN",
      locale: "auto",
      token: function (token: any) {
        console.log("token",token)
      },
    });

    handler.open({
      name: "Spade Game",
      description:
        "After you send amount by the Amount you selected, you can start funny game and you will earn more money than that.thanks",
      amount: amount * 100,
    });
  }

  go_to_page() {
    const teamatemail = $("#teamate").val();
    const opponentmail = $("#opponent").val();
    const opponentTeamate = $("#opponentTeamate").val();
    const teamateinvite = $("#teaminvite").val();

    if(teamatemail == "" && opponentTeamate == "" && opponentmail == "" && teamateinvite == ""){
      return
    }else{
      localStorage.setItem("teammate", teamatemail);
      localStorage.setItem("teaminvite", teamateinvite);
      localStorage.setItem("opponentmail", opponentTeamate);
      localStorage.setItem("opponentTeammate", opponentTeamate);
      var selecetd = $(".optionval option:selected").val();
      localStorage.setItem("min", selecetd);
      if (selecetd == 1200) {
        this.router.navigateByUrl("/editor");
      }else {
        document.getElementById("myModal").style.display = "none";
        var amount = selecetd;
        this.pay(amount);
        this.router.navigateByUrl('/editor')
      }
    }
  }

  create_game_info() {
    document.getElementById("myModal").style.display = "block";
  }

  config_setting() {
    $("#modal-container").removeAttr("class").addClass("one");
  }

  cancel() {
    document.getElementById("myModal").style.display = "none";
  }

  init(){
    setTimeout(() => {
      $("#loadingView").css("display", "none");
    }, 3000);
  }

  localTime(){
    $("#datalocaltimes").val(new Date().toISOString().substr(0, 19));
    var selecetds = $("#select_timezone option:selected").val();
    var timezone = -((new Date()).getTimezoneOffset()/60);
    var realtimezone = $('#select_timezone').val(timezone);
    $('#select_timezone').css('marginTop','0px');
  }
}































