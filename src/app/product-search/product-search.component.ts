import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Product } from '../models/product';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
    products$: Observable<Product[]>;
    private searchTerms = new Subject<string>();

    constructor(private manufacturerService: ManufacturerService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.products$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.manufacturerService.searchProducts(term)),
        );
    }
}
