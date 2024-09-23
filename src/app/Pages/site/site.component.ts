import { Component, ElementRef, inject, OnInit, signal , ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponseModel, IProperty, IPropertyType, Site } from '../../model/master';
import { map, Observable, pipe } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MasterService } from '../../Service/master.service';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule,AsyncPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {
 
  isFormView = signal<boolean>(false);
  formObj: Site = new Site();
  masterSrv = inject(MasterService)
  gridData: Site[] = [];
  propertyList: IProperty[] = [];
  @ViewChild('propertyModel') modal: ElementRef | undefined;
  currentSiteId: number = 0;

  propertyType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]>
  propertyForm: FormGroup = new FormGroup({});
  constructor() {
    this.propertyType$ = this.masterSrv.getAllPropertiesType().pipe(
      map((item:IAPIResponseModel)=>{
        return item.data
      })
    );
    this.initializeForm();
  }
  ngOnInit(): void {
    this.getGridDatab()
  }

  initializeForm(item?: IProperty) {
    this.propertyForm =  new FormGroup({ 
        propertyId:new FormControl<number>(item? item.propertyId: 0),
        propertyNo:new FormControl<number>(item? item.propertyNo: 0),
        facing:new FormControl<string>(item? item.facing: ''),
        totalArea:new FormControl<string>(item? item.totalArea: ''),
        rate:new FormControl<number>(item? item.rate: 0),
        siteId:new FormControl(this.currentSiteId)
    })
  }
  getGridDatab() {
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel)=>{
       this.gridData =  res.data;
    })
  }
  getProperties() {
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel)=>{
       this.propertyList =  res.data.filter((m:any)=>m.siteId ==  this.currentSiteId);
    })
  }
  openModal(data: Site) {
   
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.getProperties();
    if(this.modal) {
      this.modal.nativeElement.style.display ='block'
    } 
  }
 closeModal() {
    if(this.modal) {
      this.modal.nativeElement.style.display ='none'
    } 
  }

  toggleView() {
    this.isFormView.set(!this.isFormView())
  }
  onSaveProperty() {
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record's Saved Successfully");
        this.initializeForm()
        this.getProperties() 
        // this.closeModal()
      } else {
        alert(res.messege)
      }
    })
  }
  onSave() {
    this.masterSrv.saveSite(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record's Saved Successfully");
        this.initializeForm();
        this.getGridDatab();
        this.toggleView();
      } else {
        alert(res.messege)
      }
    })
  }
  onEdit(data: Site) {
    this.formObj =  data;
    this.toggleView();
  }

  onUpdate() {
    this.masterSrv.updateSites(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record's Updated Successfully");
        this.getGridDatab();
        this.initializeForm()
        this.toggleView();
      } else {
        alert(res.messege)
      }
    })
  }

  onDelete(data: Site) {
    const isDelete=  confirm('Are you Sure Want To Delete');
    if(isDelete) {
      this.masterSrv.deleteSitesTypeById(data.siteId).subscribe((res: IAPIResponseModel)=>{
        if(res.result) {
          alert("Record Delete");
          this.getGridDatab() 
        } else {
          alert(res.messege)
        }
      })
    }
  
  }
  onEditProperty(item: IProperty) {
    this.initializeForm(item)
 }


  onUpdateProperty(){
    this.masterSrv.updatePropertyMasters(this.propertyForm.value).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record's Updated Successfully");
        this.getProperties(); 
        this.initializeForm();
        // this.closeModal();
      } else {
        alert(res.messege)
      }
    })
  }

  onPropertiesDelete(id:number){
    const isDelete = confirm("Are you sure You Want to Delete");
    if(isDelete){
      this.masterSrv.deletePropertyMasterById(id).subscribe((res:IAPIResponseModel)=>{
        if(res.result){
          alert("Record Deleted Successfully");
          this.getProperties();
          this.initializeForm()
        }else{
          alert(res.messege)
        }
      })
    }
  }
}
