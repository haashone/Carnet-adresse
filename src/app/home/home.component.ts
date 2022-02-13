import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Contact } from '../model/contact';
import { MatSelect } from '@angular/material/select';
import { OperationService } from '../services/operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChildren('choosedType') typeSelects: QueryList<MatSelect>;
  contactForm: FormGroup
  addresses: FormArray;
  contact: Contact = new Contact();
  selectedTypes = new Set<string>();
  typeList = [
    { name: 'Travail' },
    { name: 'Domicile' },
    { name: 'Facturation' },
  ];
  countries = ["France", "Italie", "Espagne", "Allemagne", "Suisse"];

  constructor(private formBuilder: FormBuilder, private operationService: OperationService,
    private _snackBar: MatSnackBar, private router: Router) {
    console.log("----- Initial contacts -----")
    this.operationService.getContacts().subscribe(x => console.log(x))

  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      addresses: this.formBuilder.array([this.createAddress()], Validators.required)
    });

    this.addresses = this.contactForm.controls['addresses'] as FormArray;
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      streetNumber: ['', Validators.required],
      street: ['', Validators.required],
      phone: ['', Validators.required],
      comment: ['']
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contact.firstName = this.contactForm.value.firstName;
      this.contact.lastName = this.contactForm.value.lastName;
      this.contact.birthDate = this.contactForm.get('birthDate').value;
      this.contact.address = this.contactForm.get('addresses').value;
      this.operationService.createContact(this.contact).subscribe()
      console.log("----- After add -----")
      this.operationService.getContacts().subscribe(x => console.log(x))

      this._snackBar.open('Ajout avec succès', '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 1000
      }).afterDismissed().subscribe(() => this.router.navigate(['/dashboard/']))

    } else {
      alert("Veuillez renseigner tous les champs");
    }


  }

  clearForm() {
    this.contactForm.reset();
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

  selected() {
    this.selectedTypes.clear();
    this.typeSelects.forEach((ls) => {
      const selectedVal = ls.value;
      if (selectedVal && selectedVal !== 'undefined')
        this.selectedTypes.add(selectedVal);
    });
  }

  isSelected(type: string) {
    return this.selectedTypes.has(type);
  }

  showSelectedType(index): string {
    return this.typeList[index].name;
  }

  deleteAdress(index: number) {
    this.addresses.removeAt(index);
  }


}
