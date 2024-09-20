import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, Site } from '../../model/master';
import { MasterService } from '../../Service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  sites$: Observable<Site[]> = new Observable<Site[]>();
  masterS = inject(MasterService);
  siteId: number = 0;
  propertiesList: IProperty[] = [];

  constructor() {
    this.sites$ = this.masterS.getAllSites().pipe(
      map((res: IAPIResponseModel) => {
        return res.data;
      })
    );
  }

  getProperties(event: Event) {
    this.masterS
      .getAllPropertyBySiteId(this.siteId)
      .subscribe((res: IAPIResponseModel) => {
        this.propertiesList = res.data;
      });
  }

  openModal(data:IProperty)  {
    const model = document.getElementById('model');

    if (model) {
      model.style.display = 'block';
    }
  }
  closeModal() {
    const model = document.getElementById('model');

    if (model) {
      model.style.display = 'none';
    }
  }
}
