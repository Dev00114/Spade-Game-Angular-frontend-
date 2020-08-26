import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  url = 'http://localhost:4000';

constructor(private http : HttpClient) { }

  sendMail(teammatemail, teaminvite, opponentmail, opponentTeamate, shareurl){
    const obj = {
      sendermail      : localStorage.getItem("username"),
      teammate        : teammatemail,
      invitation      : teaminvite,
      opponentmail    : opponentmail,
      opponentTeamate : opponentTeamate,
      shareUrl        : shareurl
    }

    this.http.post(`${this.url}/sendmail/send`,obj)
        .subscribe((res) => {console.log("Done")});
  }

}
