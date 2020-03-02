import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


import { Product } from '../models/product';

import { SalesRepModel } from '../models/salesRep';

@Injectable({ providedIn: 'root' })
export class ManufacturerService {

    /*
    * TODO Repleace the field apiUrl with the real url in file 
    * environment.prod.ts
    */
    private manufacturerUrl = environment.apiUrl;

    private products$ = new ReplaySubject<Product[]>();

    constructor(private http: HttpClient) { }


    getManufacturerInfo(): Observable<{ SalesRep: SalesRepModel, items: Product[] }> {
        return this.http.get<any>(this.manufacturerUrl)
            .pipe(
                map((response) => {
                    return this.processManufacturerResponse(response);
                }),
                catchError(this.handleError<Product[]>('getProducts', []))
            );
    }

    /*
    * This implementation asume there is only one endPoint 
    * to request all the data related to a Manufacturer,
    * so this function return an observable of the produts requested with the Manufacturer.
    * 
    */
    getProductList(): Observable<Product[]> {
        return this.products$.asObservable();
    }

    /*
    * This implementation asume there is only one endPoint 
    * to request all the data related to a Manufacturer,
    * so this function filter an observable of the produts requested with the Manufacturer.
    * 
    */
    getProduct(id: number): Observable<Product> {

        return this.getProductList()
            .pipe(
                map(items => {
                    const products = items.filter(p => p.ProductID === id);
                    return products ? products[0] : null;
                })
            );
    }

    /* GET products whose name contains search term 
    * This implementation asume there is only one endPoint 
    * to request all the data related to a Manufacturer,
    * so this function filter an observable of the produts requested with the Manufacturer.
    * In a different scenario should probably call the back-end to extend the search.
    */
    searchProducts(term: string): Observable<Product[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.getProductList().pipe(
            map(items => {
                const products = items.filter(p => p.ItemName.toLowerCase().includes(term.toLowerCase()));
                return products;
            }),
            catchError(this.handleError<Product[]>('searchProducts', []))
        );
    }


    processManufacturerResponse(json) {
        /* 
        * Notify observers of the product's list with the new list of products.
        * This implementation asume there is only one call to get al the information about
        * Manufacturer and products 
        */
        this.products$.next(json.items);

        return json;
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            this.log(`${operation} failed: ${error.message}`);

            // Returning an empty result to let the app keep running.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}
