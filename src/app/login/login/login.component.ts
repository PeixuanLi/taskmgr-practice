import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('info@peixuanli.com',Validators.compose([Validators.email, Validators.required])),
      password : new FormControl('',Validators.required)
    });
  }
  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

}
