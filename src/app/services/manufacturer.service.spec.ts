import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ManufacturerService } from './manufacturer.service';
import { MANUFACTURER } from '../mock-manufacturer';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { doesNotReject } from 'assert';

describe('ManufacturerService', () => {
    let service: ManufacturerService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ManufacturerService,
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });

        service = TestBed.get(ManufacturerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an empty array when getProductList is invoked before getManufacturerInfo', () => {
        const result = [];

        const result$ = service.getProductList();

        result$.subscribe({
            next: (value) => { result.push(value) },
            complete: () => {
                expect(result.length).toEqual(0);
            }
        });
    });

    it('should return an empty array when getProduct is invoked before getManufacturerInfo', () => {
        const result = [];

        const result$ = service.getProduct(1);

        result$.subscribe({
            next: (value) => { result.push(value) },
            complete: () => {
                expect(result).toBeNull;
            }
        });
    });

    it('should return the data of the manufacturer when getManufacturerInfo is invoked', () => {
        httpClientSpy.get.and.returnValue(of(MANUFACTURER[0]));

        service.getManufacturerInfo().subscribe(
            manufacturer => {
                expect(manufacturer.SalesRep.SalesRepID).toEqual(123);
                expect(manufacturer.SalesRep.CompanyName).toEqual("Acme Corporation");
                expect(manufacturer.SalesRep.FirstName).toEqual("John")
            }
        );
    });

    it('should return a list of product when getManufacturerInfo is invoked before getProductList', async () => {
        httpClientSpy.get.and.returnValue(of(MANUFACTURER[0]));
        const result = [];

        const result$ = service.getManufacturerInfo();

        result$.subscribe({
            next: (value) => { result.push(value) },
            complete: () => service.getProductList().subscribe(
                products => {
                    return expect(products.length).toEqual(1)
                }
            )
        });
    });

    it('should return a product when getManufacturerInfo is invoked before getProduct', async () => {
        httpClientSpy.get.and.returnValue(of(MANUFACTURER[0]));
        const result = [];

        const result$ = service.getManufacturerInfo();

        result$.subscribe({
            next: (value) => { result.push(value) },
            complete: () => service.getProduct(642698834).subscribe(
                product => {
                    expect(product.ProductID).toEqual(642698834);
                    expect(product.ItemID).toEqual("F124A54");
                }
            )
        });
    });

});


