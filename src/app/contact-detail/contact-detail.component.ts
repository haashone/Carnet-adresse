import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Contact } from '../model/contact';
import { MatSelect } from '@angular/material/select';
import { OperationService } from '../services/operation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../model/address';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})

export class ContactDetailComponent implements OnInit {

  @ViewChildren('choosedType') typeSelects: QueryList<MatSelect>;
  contactForm: FormGroup
  initialContactForm: FormGroup
  addresses: FormArray;
  contactID;
  contact = new Contact();
  selectedTypes = new Set<string>();

  typeList = [
    { name: 'Travail' },
    { name: 'Domicile' },
    { name: 'Facturation' },
  ];
  countries = ["France", "Italie", "Espagne", "Allemagne", "Suisse"];


  constructor(private formBuilder: FormBuilder, private operationService: OperationService,
    private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {

    this.contactID = this.route.snapshot.paramMap.get('id')!;
    console.log("ID ----- " + this.contactID)
  }

  ngOnInit(): void {
    this.loadCurrentContact()
  }

  loadCurrentContact() {

    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      addresses: this.formBuilder.array([], Validators.required)
    });

    this.addresses = this.contactForm.controls['addresses'] as FormArray;
    this.operationService.getContact(this.contactID).subscribe((c: Contact) => {
      console.log("Current Contact ----- " + JSON.stringify(c))

      this.contactForm.patchValue(c)
      c.address.forEach(adrs => {
        this.addresses.push(this.loadAddress(adrs))
      })

      this.contactForm.controls['addresses'] = this.addresses
    },(err)=>this.router.navigate(['/dashboard/']));

  }

  loadAddress(adrs: Address): FormGroup {
    return this.formBuilder.group({
      type: [adrs.type, Validators.required],
      country: [adrs.country, Validators.required],
      city: [adrs.city, Validators.required],
      zipCode: [adrs.zipCode, Validators.required],
      streetNumber: [adrs.streetNumber, Validators.required],
      street: [adrs.street, Validators.required],
      phone: [adrs.phone, Validators.required],
      comment: [adrs.comment]
    })
  }


  addAddressGroup() {
    if (this.addresses.length < this.typeList.length) {
      let newAddress: FormGroup = this.formBuilder.group({
        type: [''],
        country: [''],
        city: [''],
        zipCode: [''],
        streetNumber: [''],
        street: [''],
        phone: [''],
        comment: ['']
      });
      this.addresses.push(newAddress);
      this.contactForm.controls['addresses'] = this.addresses;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contact.id = Number(this.contactID)
      this.contact.firstName = this.contactForm.value.firstName;
      this.contact.lastName = this.contactForm.value.lastName;
      this.contact.birthDate = this.contactForm.get('birthDate').value;
      this.contact.address = this.contactForm.get('addresses').value;
      console.log(this.contact);

      this.operationService.editContact(this.contact).subscribe()
      console.log("----- After update -----")
      this.operationService.getContacts().subscribe(x => console.log(x))

      this._snackBar.open('Modification avec succès', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 1000
                }).afterDismissed().subscribe(() => 
                this.router.navigate(['/dashboard/'])
                )
     
    } else {
      alert("Veuillez renseigner tous les champs");
    }
  }

  clearForm() {
    this.loadCurrentContact()
  }

  selected() {
    this.selectedTypes.clear();
    this.typeSelects.forEach((ls) => {
      const selectedVal = ls.value;
      if (selectedVal && selectedVal !== '')
        this.selectedTypes.add(selectedVal);
    });
  }

  isSelected(type: string) {
    return this.selectedTypes.has(type);
  }


  deleteAdress(index: number) {
    this.addresses.removeAt(index);
  }



}
