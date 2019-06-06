import { PostsService } from '../../posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private fb: FormBuilder, private postService: PostsService, private router: Router, private matSnackBar: MatSnackBar) { }

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

  postForm: FormGroup;
  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 100;
    this.postForm = this.fb.group({
      blood_group: [null, Validators.required],
      location: this.fb.group({
        area: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: ['India', Validators.required]
      })
    });
  }

  addPost (pForm) {
    const postObject = {
      blood_group: pForm.value.blood_group,
      location: Object.values(pForm.value.location).join(',')
    };
    pForm.reset();
    console.log(postObject);
    this.postService.createPost(postObject).subscribe(resp => {
      console.log(resp);
      this.matSnackBar.open('Post Added!', '', {
        duration: 2000,
        panelClass: 'snack-bar'
      });
      this.router.navigate(['/posts/myposts/current']);
    }, err => {
      console.log(err);
    });
  }

}
