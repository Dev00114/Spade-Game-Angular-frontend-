import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { DocumentService } from "../../core/services/document.service";

@Component({
  selector: "app-documentList",
  templateUrl: "./documentList.component.html",
  styleUrls: ["./documentList.component.scss"],
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(
      (doc) => (this.currentDoc = doc.id)
    );
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
    console.log("aaaaaaaaaa");
  }
}
