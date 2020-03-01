import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MANUFACTURER } from './mock-manufacturer';
import { AppComponent } from './app.component';
import { ManufacturerService } from './services/manufacturer.service';

describe('AppComponent', () => {
    let manufacturerService;
    let getManufacturerSpy;

    beforeEach(async(() => {
        manufacturerService = jasmine.createSpyObj('ProductService', ['getManufacturerInfo']);
        getManufacturerSpy = manufacturerService.getManufacturerInfo.and.returnValue(of(MANUFACTURER[0]));
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: ManufacturerService, useValue: manufacturerService }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
