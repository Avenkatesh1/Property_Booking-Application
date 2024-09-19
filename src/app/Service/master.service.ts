import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponseModel, IPropertyType } from '../model/master';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor( private http:HttpClient) { }

  getAllPropertiesType():Observable<IAPIResponseModel>{
   return this.http.get<IAPIResponseModel>(environment.API_URL + "GetAllPropertyType");
  }

  savePropertyType(obj: IPropertyType):Observable<IAPIResponseModel> {
    const newObh = [obj]
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyType',newObh)
  }
  
  updatePropertyType(obj: IPropertyType):Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyType',obj)
  }

  deletePropertyById(id:number):Observable<IAPIResponseModel>{
   return this.http.delete<IAPIResponseModel>(environment.API_URL + "DeletePropertyTypeById?id=" +id)
  }
}