import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { Contact } from '../model/contact';
import { OperationService } from '../services/operation.service';
import { Address } from '../model/address';
import { BtnHandlersRenderComponent } from './renders/btn-handlers-render/btn-handlers-render.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  temp: any[] = []
  rowData: any[] = []
  gridApi: GridApi;
  gridColumnApi: any;
  components = {
    'BtnHandlersRenderComponent': BtnHandlersRenderComponent
  };

  constructor(private operationService: OperationService) {
    this.operationService.getContacts().subscribe((contacts: Contact[]) => {
      contacts.forEach((contact: Contact) => {
        contact.address.forEach((address: Address) => {
          let rec = {
            "reference": contact.id,
            "id": contact.id,
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "birthDate": contact.birthDate,
            "addressType": address.type,
            "addressCountry": address.country,
            "addressCity": address.city,
            "addressZipCode": address.zipCode,
            "addressSteetNumber": address.streetNumber,
            "addressStreet": address.street,
            "addressPhoneNumber": address.phone,
            "addressComment": address.comment,
            "addressElements": contact.address.length
          }

          this.temp.push(rec)
          let res = [];
          this.temp.map(function (item) {
            var existItem = res.find(x => x.id == item.id);
            if (existItem) {
              item.id = ""
              item.firstName = ""
              item.lastName = ""
              item.birthDate = ""
            }
            else {
              res.push(item);
            }
          });
          this.rowData = this.temp
        })
      })
    })
  }
  ngOnInit(): void {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  columnDefs = [
    {
      headerName: 'Données contact',
      children: [
        {
          headerName: "#",
          field: 'id',
          width: 80,

        },
        {
          headerName: "Prénom",
          field: 'lastName',
          width: 150,

        },
        {
          headerName: "Nom",
          field: 'firstName',
          width: 150,

        },
        {
          headerName: 'Date de naissance',
          field: 'birthDate',
          width: 150,

        },
      ],
    },
    {
      headerName: 'Addresses',
      children: [
        {
          headerName: "Type",
          columnGroupShow: 'closed',
          field: 'addressType',
          width: 100,
          filter: 'agTextColumnFilter'
        },
        {
          headerName: "Pays",
          columnGroupShow: 'closed',
          field: 'addressCountry',
          width: 100,
          filter: 'agTextColumnFilter',
        },
        {
          headerName: "Ville",
          columnGroupShow: 'closed',
          field: 'addressCity',
          width: 100,
          filter: 'agTextColumnFilter',
        },
        {
          headerName: "CP",
          columnGroupShow: 'closed',
          field: 'addressZipCode',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: "Num",
          columnGroupShow: 'closed',
          field: 'addressSteetNumber',
          width: 100,
          filter: 'agTextColumnFilter',
        }, {
          headerName: "Rue",
          columnGroupShow: 'closed',
          field: 'addressStreet',
          width: 150,
          filter: 'agNumberColumnFilter',
        }, {
          headerName: "Téléphone",
          columnGroupShow: 'closed',
          field: 'addressPhoneNumber',
          width: 120,
          filter: 'agNumberColumnFilter',
        },
        {
          field: "",
          headerName: "",
          cellRendererSelector: (params) => {
            const btnDelete = {
              component: this.components.BtnHandlersRenderComponent
            }
            if (params.data.id != "") {
              return btnDelete
            }
          },

          width: 100
        }
      ]
    },
  ];

  deleteContact(id) {
    this.operationService.deleteContact(id).subscribe(x => console.log(x));
  }

}
