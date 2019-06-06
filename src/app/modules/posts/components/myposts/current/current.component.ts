
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { PostResp } from '../../../models/post-resp.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  constructor(private postService: PostsService, private router: Router) { }

  routeVals = [
    { path: '/myposts/current', title: 'Current'},
    { path: '/myposts/resolved', title: 'Resolved'}
  ];
  posts: PostResp[];
  isLoading = true;

  ngOnInit() {
    this.postService.myCurrentPosts.subscribe((posts: PostResp[]) => {
      console.log('Current Posts');
      console.log(posts);
      this.posts = posts;
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
  }

  openPost (postId: string) {
    console.log('post-id: ' + postId);
    this.router.navigate([`/posts/post/${postId}`]);
  }

}
