import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../models/product';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private manufacturerService: ManufacturerService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.subscription = this.manufacturerService.getProduct(id)
            .subscribe(product => {
                return this.product = product;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
