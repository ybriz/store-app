import { Component } from '@angular/core';

import { ManufacturerService } from './services/manufacturer.service';
import { SalesRepModel } from './models/salesRep';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    salesRep: SalesRepModel;
    productimagesUrl: string;

    constructor(private manufacturerService: ManufacturerService) {
        this.getManufacturerInfo();
    }

    getManufacturerInfo(): void {
        this.manufacturerService.getManufacturerInfo()
            .subscribe(data => {
                this.productimagesUrl = this.getProductimagesUrl(data.items[0].ManufacturerID);
                this.salesRep = data.SalesRep;
            });
    }

    getProductimagesUrl(manufacturerID: number) {
        const url = environment.productimagesUrl(manufacturerID);
        return `${url}?height=80&Cache=Alway`;
    }
}
