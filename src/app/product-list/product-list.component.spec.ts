import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';

import { of } from 'rxjs';
import { PRODUCTS } from '../mock-products';
import { ManufacturerService } from '../services/manufacturer.service';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let manufacturerService;
    let getProductsSpy;

    beforeEach(async(() => {
        manufacturerService = jasmine.createSpyObj('ProductService', ['getProductList']);
        getProductsSpy = manufacturerService.getProductList.and.returnValue(of(PRODUCTS));
        TestBed.configureTestingModule({
            declarations: [
                ProductListComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: ManufacturerService, useValue: manufacturerService }
            ]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
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
