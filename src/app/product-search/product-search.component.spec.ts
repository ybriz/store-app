import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductSearchComponent } from './product-search.component';


describe('ProductSearchComponent', () => {
    let component: ProductSearchComponent;
    let fixture: ComponentFixture<ProductSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductSearchComponent],
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
