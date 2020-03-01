import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PRODUCTS } from '../mock-products';
import { ManufacturerService } from '../services/manufacturer.service';

describe('ProductDetailComponent', () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;
    let manufacturerService;
    let getProductSpy;

    beforeEach(async(() => {
        manufacturerService = jasmine.createSpyObj('ProductService', ['getProduct']);
        getProductSpy = manufacturerService.getProduct.and.returnValue(of(PRODUCTS[0]));
        TestBed.configureTestingModule({
            declarations: [
                ProductDetailComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: ManufacturerService, useValue: manufacturerService }
            ]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display 1 links', async(() => {
        expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(1);
    }));

});
