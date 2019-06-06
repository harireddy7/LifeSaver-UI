import { PostResp } from './../posts/models/post-resp.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private matSnackBar: MatSnackBar) { }

  userdata;

  ngOnInit() {
    this.auth.userDetails.subscribe((data) => {
      console.log(data);
      this.userdata = data;
    });
  }

  logout() {
    this.auth.logout().subscribe(resp => {
      console.log(resp);
      this.auth.authToken.next(null);
      this.auth.userDetails.next(null);
      this.matSnackBar.open(resp, '', {
        duration: 2000,
        panelClass: 'snack-bar'
      });
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }

  logoutAll () {
    this.auth.logoutAll().subscribe(resp => {
      console.log(resp);
      this.auth.authToken.next(null);
      this.auth.userDetails.next(null);
      this.matSnackBar.open(resp, '', {
        duration: 2000,
        panelClass: 'snack-bar'
      });
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }



}
