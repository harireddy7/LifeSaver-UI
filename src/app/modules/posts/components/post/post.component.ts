import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../auth/auth.service';
import { PostResp } from './../../models/post-resp.model';
import { PostsService } from './../../posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  editForm: FormGroup;
  isEditable = false;
  constructor(
    private actRoute: ActivatedRoute,
    private postService: PostsService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  postData: PostResp;
  isLoading = true;
  mode;
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
    this.postService.getPostData(this.actRoute.snapshot.paramMap.get('id')).subscribe((postdata: PostResp) => {
      console.log(postdata);
      this.postData = postdata;
      console.log(postdata.location.split(','));
      const [ area, city, state, country ] = postdata.location.split(',');
      this.editForm = this.fb.group({
        blood_group: [postdata.blood_group, Validators.required],
        location: this.fb.group({
          area: [area, Validators.required],
          city: [city, Validators.required],
          state: [state, Validators.required],
          country: [ country, Validators.required]
        })
      });
      this.auth.userDetails.subscribe(user => {
        console.log(user);
        if (user['_id'].toString() === postdata['owner'].toString()) {
          this.mode = 'current';
        } else {
          this.mode = 'read';
        }
      });
      this.isLoading = false;
    }, (err => {
      console.log(err);
      this.isLoading = false;
    }));
  }

  makeEditable() {
    this.isEditable = true;
    document.body.scrollTop = document.documentElement.scrollTop = 515;
  }

  resolve() {
    this.postService.resolvePost(this.actRoute.snapshot.paramMap.get('id')).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  update(eForm) {
    const postObject = {
      blood_group: eForm.value.blood_group,
      location: Object.values(eForm.value.location).join(',')
    };
    // eForm.reset();
    console.log(postObject);
    if (postObject.blood_group === this.postData.blood_group && postObject.location === this.postData.location) {
      this.isEditable = false;
    } else {
        this.postService.updatePost(this.actRoute.snapshot.paramMap.get('id'), postObject).subscribe(resp => {
          console.log(resp);
          this.isEditable = false;
          // this.postData.blood_group = postObject.blood_group;
          // this.postData.location = postObject.location;
          this.postData = {...this.postData, ...postObject};
          this.router.navigate(['/posts/myposts/current']);
        }, err => {
          console.log(err);
        });

    }
  }

  delete () {
    this.postService.deletePost(this.actRoute.snapshot.paramMap.get('id')).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/posts/myposts/current']);
    }, err => {
      console.log(err);
    });
  }

  notifyMail() {
    this.postService.sendMail(this.postData.blood_group).subscribe(mailResp => {
      console.log(mailResp);
      if (mailResp.status === 200) {
        this.matSnackBar.open(`Mail sent to ${this.postData.blood_group} Donors!`, '', {
          duration: 2000,
          panelClass: 'snack-bar'
        });
      }
    }, err => {
      console.log(err);
    });
  }

}
