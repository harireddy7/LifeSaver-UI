import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.logForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  login(f) {
    const user = f.value;
    this.matSnackBar.open('logging in...', '', {
      panelClass: 'snack-bar',
    });
    this.auth.loginUser(user).subscribe((resp: { user: {}; token: string }) => {
        f.reset();
        console.log(resp);
        this.matSnackBar.dismiss();
        this.auth.authToken.next(resp.token);
        this.auth.userDetails.next(resp.user);
        this.router.navigate(['/posts']);
      },
      ({error}) => {
        console.log(error);
        this.matSnackBar.open( 'Invalid Credentials', '', {
          duration: 2000,
          panelClass: 'snack-bar',
        });
      }
    );
  }
}
