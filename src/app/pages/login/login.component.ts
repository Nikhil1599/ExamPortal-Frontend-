import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginData = {
    username:'',
    password:''
  }
  constructor(private snack:MatSnackBar){}
  ngOnInit(): void {

  }
  formSubmit(){
    if(this.loginData.username.trim()==''|| this.loginData.username == null){
      this.snack.open('Username is required !','',{duration:3000,});
      return;
    }
    if(this.loginData.password.trim()==''|| this.loginData.password == null){
      this.snack.open('Password is required !','',{duration:3000,});
      return;
    }
  }
}
