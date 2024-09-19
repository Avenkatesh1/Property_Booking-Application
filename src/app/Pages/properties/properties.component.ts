import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Service/master.service';
import { IAPIResponseModel, IPropertyType } from '../../model/master';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit{

  mastersrv = inject(MasterService);
  PropertiesList: IPropertyType[] =[]

  form: FormGroup = new FormGroup({});
  route = inject(Router)
  propertyType: any;

   constructor(){
    this.initializeForm()
   }
  ngOnInit(): void {
    this.grtAllPraperties();
  }

  initializeForm(item?:IPropertyType){
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item? item.propertTypeId: 0),
      propertyType: new FormControl<string>(item? item.propertyType: ''),
    })
  }

  grtAllPraperties(){
    this.mastersrv.getAllPropertiesType().subscribe((res:IAPIResponseModel)=>{
       this.PropertiesList = res.data
    })
  }

  savePropertyType(){
    this.mastersrv.savePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record Saved Successfully");
        this.grtAllPraperties();
        this.initializeForm()
      }else{
        alert(res.messege)
      }
    })
  }

  onEdit(data: IPropertyType) {
     this.initializeForm(data)
  }

  updatePropertyType(){
    this.mastersrv.updatePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record updated Successfully");
        this.grtAllPraperties();
        this.initializeForm()
      }else{
        alert(res.messege)
      }
    })
  }

  deletePropertyById(id:number){
    const isDelete = confirm("Are you sure You Want to Delete");
    if(isDelete){
      this.mastersrv.deletePropertyById(id).subscribe((res:IAPIResponseModel)=>{
        if(res.result){
          alert("Record Deleted Successfully");
          this.grtAllPraperties();
          this.initializeForm()
        }else{
          alert(res.messege)
        }
      })
    }
  }

}

