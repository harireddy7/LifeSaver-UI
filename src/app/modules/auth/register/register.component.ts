import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private matSnackBar: MatSnackBar) { }

  regForm: FormGroup;
  groups = [
    { text: 'A+VE', value: 'A POSITIVE'},
    { text: 'A-VE', value: 'A NEGATIVE'},
    { text: 'B+VE', value: 'B POSITIVE'},
    { text: 'B-VE', value: 'B NEGATIVE'},
    { text: 'AB+VE', value: 'AB POSITIVE'},
    { text: 'AB-VE', value: 'AB NEGATIVE'},
    { text: 'O+VE', value: 'O POSITIVE'},
    { text: 'O-VE', value: 'O NEGATIVE'}
  ];

  ngOnInit() {
    this.regForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      blood_group: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      mobile: [null, [Validators.required, Validators.minLength(10)]],
      password: [null, [Validators.required, Validators.minLength(7)]],
      location: this.fb.group({
        area: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: ['India', Validators.required],
      })
    });
  }

  register(f) {
    this.matSnackBar.open('Registering...', '', {
      panelClass: 'snack-bar'
    });
    console.log(f.value);
    const location = Object.values(f.value.location).join(',');
    const { name, blood_group, email, password, age, mobile } = f.value;
    const userObject = { name, blood_group, email, password, mobile, age, location};
    console.log(name, blood_group, email, password, mobile, age, location);
    console.log(userObject);
    this.auth.registerUser(userObject).subscribe((resp: {user: {}, token: string}) => {
      console.log(resp);
      f.reset();
      this.matSnackBar.dismiss();
      // localStorage.setItem('token', resp.token);
      this.auth.authToken.next(resp.token);
      this.auth.userDetails.next(resp.user);
      this.router.navigate(['/posts']);
    },
    ({error}) => {
      console.log(error.errmsg);
      if (error.errmsg && error.errmsg.includes('email')) {
        this.matSnackBar.open('Email already registered', '', {
          duration: 2000,
          panelClass: 'snack-bar'
        });
      }
      if (error.errmsg && error.errmsg.includes('mobile')) {
        this.matSnackBar.open('Mobile already registered', '', {
          duration: 2000,
          panelClass: 'snack-bar'
        });
      }
      if (!error.errmsg) {
        this.matSnackBar.open('Server Error!', '', {
          duration: 2000,
          panelClass: 'snack-bar'
        });
      }
    }
  );
  }

}
