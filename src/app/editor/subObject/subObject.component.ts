import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-subObject',
  templateUrl: './subObject.component.html',
  styleUrls: ['./subObject.component.css']
})
export class SubObjectComponent implements AfterViewInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  constructor() { }

  ngAfterViewInit() {
    if(this.session){
      const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, { width: '150px', height: '100px' }, (err) => {
        if (err) {
          alert(err.message);
        }
      });
    }

    console.log("stream",this.stream)
  }

}
