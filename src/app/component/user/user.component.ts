import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

export class DBrainErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  dobFormControl = new FormControl('', [Validators.required]);
  telephoneFormControl = new FormControl('', [Validators.required]);

  matcher = new DBrainErrorStateMatcher();

  user: User = {
    id: 0,
    first_name: "",
    last_name: "",
    birthday: "",
    telephone: "",
    email: "",
  };

  constructor(private router: Router, public userservice: UserService) { }

  ngOnInit(): void {
    this.user = this.userservice.getUser();
  }

  saveUserInfo() {
    if(this.emailFormControl.valid
        && this.emailFormControl.valid
        && this.firstnameFormControl.valid
        && this.lastnameFormControl.valid
        && this.dobFormControl.valid
        && this.telephoneFormControl.valid) {
      if (this.user.id == 0) { //add new user
        //set a new user id for the new user you are going to add
        this.user.id = this.userservice.listUsers().length + 1;
        this.userservice.addUser(this.user);
      } else { //edit & save user
        this.userservice.editUser(this.user);
      }
      this.router.navigateByUrl('/userlist'); 
    }
  }

  backUserList() { 
    this.router.navigateByUrl('/userlist');
  }
}
