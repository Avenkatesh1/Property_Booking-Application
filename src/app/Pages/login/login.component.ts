import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  userForm : FormGroup =  new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
   
  route = inject(Router)

  onLogin(){
    const user = this.userForm.value
     if(user.username == "admin" && user.password == 12345){
      alert("Login Successfuly")
       this.route.navigateByUrl('/Dashboard')
     }else{
      alert("User-Name and Passwords are Incorect")
     }
  }
}
