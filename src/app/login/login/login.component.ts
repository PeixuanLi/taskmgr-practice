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
      email : new FormControl('info@peixuanli.com',Validators.compose([Validators.email, Validators.required, this.validate])),
      password : new FormControl('',Validators.required)
    });
  }
  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }
  validate(c :FormControl) :{ [key:string]:any}{
    if(!c.value){
      return null;
    }
    const pattern = /^wang+/;
    if(pattern.test(c.value)){
      return null;
    }
    return {
      emailNotValid: "email must start with wang"
    }
  }

}
