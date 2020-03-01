import { Product } from './models/product';
import { SalesRepModel } from './models/salesRep';

export const MANUFACTURER: any = [
    {
        SalesRep: {
            SalesRepID: 123,
            CompanyName: "Acme Corporation",
            FirstName: "John",
            LastName: "Doe",
            EmailAddress: "EmailAddress",
            CellPhone: "CellPhone",
            Phone: "Phone",
            Fax: "Fax",
            City: "City",
            State: "State",
            PostalCode: "PostalCode"
        },
        items: [
            {
                ProductID: 642698834,
                ManufacturerID: 772,
                ItemID: "F124A54",
                ItemName: "The Article No. 54 Wooden Cube",
                Description: "This old wood crate look has a tufted burlap removable top and woven handle. The crate is lined in rustic distressed metal and nailed into place.",
                Notes: "",
                Dimensions: "18 X 18 X 18",
                BasePrice: 237,
                PhotoName: "http://images.repzio.com/productimages/202/f124a54_lg.jpg"
            }
        ]
    }
];
