export interface IAPIResponseModel {
    result:boolean;
    messege:string;
    data:any
}

export interface IPropertyType {
    propertTypeId:number;
    propertyType:string
}

export interface IProperty {
    propertyId:number;
    propertyNo:number;
    facing:string;
    totalArea:string;
    rate:number;
    siteId:number

}
 export class Site {
    siteId: number;
    siteTitle: string;
    location: string;
    propertyTypeId: string;
    city: string;
    pincode: string;
    state: string;
    totalProperties: string;
    createdDate: Date;
    lastUpdatedDate: Date;

    constructor(){
        this.siteId= 0;
        this.siteTitle = '';
        this.location = '';
        this.propertyTypeId= '';
        this.city = '';
        this.pincode = '';
        this.state = '';
        this.totalProperties = '';
        this.createdDate = new Date();
        this.lastUpdatedDate = new Date();
    }
 }