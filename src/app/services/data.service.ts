import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      contacts: [
        {
          id: 1,
          firstName: 'Doe',
          lastName: 'John',
          birthDate: '1990-02-15',
          address: [{
            type: 'Travail',
            country: 'France',
            city: 'Paris',
            zipCode: '75008',
            streetNumber: '12',
            street: '4 Rue de la Pepiniere',
            phone: '0623000011',
            comment: ''
          }, {
            type: 'Domicile',
            country: 'France',
            city: 'Paris',
            zipCode: '75008',
            streetNumber: '46',
            street: '46 Rue Monsieur le Prince',
            phone: '0623000011',
            comment: '2ème étage chambre 23'
          }]
        },
        {
          id: 2,
          firstName: 'Lorent',
          lastName: 'Pascal',
          birthDate: '1985-06-02',
          address: [{
            type: 'Travail',
            country: 'France',
            city: 'Strasbourg',
            zipCode: '67100',
            streetNumber: '5',
            street: '5 rue Descartes',
            phone: '0765003011',
            comment: ''
          }, {
            type: 'Domicile',
            country: 'France',
            city: 'Strasbourg',
            zipCode: '67100',
            streetNumber: '17',
            street: '17 rue St Ferréol',
            phone: '0765003011',
            comment: ''
          }, {
            type: 'Facturation',
            country: 'France',
            city: 'Strasbourg',
            zipCode: '67100',
            streetNumber: '17',
            street: '17 rue St Ferréol',
            phone: '0765003011',
            comment: ''
          }]
        },
        {
          id: 3,
          firstName: 'LeBlanc',
          lastName: 'Nicolas',
          birthDate: '1994-01-23',
          address: [{
            type: 'Travail',
            country: 'France',
            city: 'Nantes',
            zipCode: '13002',
            streetNumber: '3',
            street: '3 rue Charles Nicolle',
            phone: '0729004051',
            comment: ''
          }, {
            type: 'Domicile',
            country: 'France',
            city: 'Le Mans',
            zipCode: '72000',
            streetNumber: '19',
            street: '19 rue de la presle',
            phone: '0724619813',
            comment: '1èr étage chambre A123'
          }]
        }
      ]
    };
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  }


}