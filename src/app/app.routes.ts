import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SiteComponent } from './Pages/site/site.component';
import { PropertiesComponent } from './Pages/properties/properties.component';
import { BookingsComponent } from './Pages/bookings/bookings.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"Login",
        pathMatch:"full"
    },
    {
        path:"Login",
        component:LoginComponent
    },
    {
        path:"",
        component:LayoutComponent,
        children:[

            {
                path:"Dashboard",
                component:DashboardComponent
            },
            {
                path:"Site",
                component:SiteComponent
            },
            {
                path:"Property-List",
                component:PropertiesComponent
            },
            {
                path:"Booking",
                component:BookingsComponent
            },
        ]
    }
];
