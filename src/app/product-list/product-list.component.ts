import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ManufacturerService } from '../services/manufacturer.service';

import { Product } from '../models/product';


@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];

    subscription: Subscription;

    constructor(private router: Router, private manufacturerService: ManufacturerService) {}

    ngOnInit() {
        this.subscription = this.manufacturerService.getProductList()
            .subscribe(products => {
                return this.products = products;
            });
    }

    showProductDetails(product: Product) {
        this.router.navigate([`/product/${product.ProductID}`]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
