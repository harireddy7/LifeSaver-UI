import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { PostResp } from '../../../models/post-resp.model';

@Component({
  selector: 'app-resolved',
  templateUrl: './resolved.component.html',
  styleUrls: ['./resolved.component.css']
})
export class ResolvedComponent implements OnInit {

  constructor(private postService: PostsService) { }

  routeVals = [
    { path: '/myposts/current', title: 'Current'},
    { path: '/myposts/resolved', title: 'Resolved'}
  ];
  posts: PostResp[];
  isLoading = true;

  ngOnInit() {
    this.postService.myResolvedPosts.subscribe((posts: PostResp[]) => {
      console.log('Resolved Posts');
      console.log(posts);
      this.posts = posts;
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
  }

}
