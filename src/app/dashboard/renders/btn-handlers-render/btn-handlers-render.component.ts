import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, RowNode } from "ag-grid-community";
import { OperationService } from '../../../services/operation.service';
@Component({
  selector: 'app-btn-handlers-render',
  templateUrl: './btn-handlers-render.component.html',
  styleUrls: ['./btn-handlers-render.component.scss']
})
export class BtnHandlersRenderComponent implements ICellRendererAngularComp {
  params: any;
  contactID: any;
  constructor(private operationService: OperationService,
    private router: Router) { }

  agInit(params: any): void {
    this.params = params;
    this.contactID = this.params.data.reference
  }

  btnDeleteHandler() {
    this.operationService.deleteContact(this.contactID).subscribe();
    this.operationService.getContacts().subscribe(x => console.log(x))
    this.params.api.forEachNode((rowNode: RowNode, index: number) => {
      if (rowNode.data.reference === this.contactID) {
        this.params.api.applyTransaction({ remove: [rowNode.data] });
      }
    })
  }

  btnRedirectHandler() {
    this.router.navigate(['/detail/' + this.contactID]);
  }
  refresh(params: ICellRendererParams): boolean {
    return true;
  }

}