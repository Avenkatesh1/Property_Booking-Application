import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, Site } from '../../model/master';
import { MasterService } from '../../Service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  sites$: Observable<Site[]> = new Observable<Site[]>();
  masterS = inject(MasterService);
  siteId: number = 0;
  propertiesList: IProperty[] = [];
  bookingList: any[] = [];
  currentPropertyId:number =0;

  bookingForm: FormGroup = new FormGroup({});

  constructor() {
    this.initializeBookinForm();
    this.sites$ = this.masterS.getAllSites().pipe(
      map((res: IAPIResponseModel) => {
        return res.data;
      })
    );
  }

  initializeBookinForm(){
    this.bookingForm = new FormGroup({
       bookingId: new FormControl(0),
       propertyId: new FormControl(this.currentPropertyId),
       bookingRate: new FormControl(''),
       totalAmount: new FormControl(''),
       custId: new FormControl(0),
       bookingDate: new FormControl(''),
       name: new FormControl(''),
       mobile: new FormControl(''),
       emailid: new FormControl(''),
       address: new FormControl(''),
    }) 
  }

  getProperties(event: Event) {
    this.getBookingBySiteId()
    this.masterS.getAllPropertyBySiteId(this.siteId).subscribe((res: IAPIResponseModel) => {
        this.propertiesList = res.data;
      });
  }
  getBookingBySiteId() {
    this.masterS.getAllPropertyBookingBySiteId(this.siteId).subscribe((res: IAPIResponseModel) => {
        this.bookingList = res.data;
      });
  }

  openModal(data:IProperty)  {
    this.currentPropertyId = data.propertyId;
    this.initializeBookinForm()
    const model = document.getElementById('modalPapup');
    if (model) {
      model.style.display = 'block';
    }
  }
  closeModal() {
    const model = document.getElementById('modalPapup');
    if (model) {
      model.style.display = 'none';
    }
  }
  onPropertiesSave(){
    this.masterS.onSaveBooking(this.bookingForm.value).subscribe((res: IAPIResponseModel)=>{
      if(res.result) {
        alert("Record's Saved Successfully");
        this.getBookingBySiteId();
      } else {
        alert(res.messege)
      }
    })
  }
}
