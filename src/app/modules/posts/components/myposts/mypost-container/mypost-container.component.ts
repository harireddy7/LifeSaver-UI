import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../posts.service';
import { PostResp } from '../../../models/post-resp.model';

@Component({
  selector: 'app-mypost-container',
  templateUrl: './mypost-container.component.html',
  styleUrls: ['./mypost-container.component.css']
})
export class MypostContainerComponent implements OnInit {

  constructor(private postService: PostsService, private actRoute: ActivatedRoute) { }

  routeVals = [
    { path: '/posts/myposts/current', title: 'Current'},
    { path: '/posts/myposts/resolved', title: 'Resolved'}
  ];

  ngOnInit() {
    this.postService.getMyPosts().subscribe((posts: PostResp[]) => {
      console.log('My Posts');
      console.log(posts);
      console.log(this.actRoute.snapshot.url);
      this.postService.myAllPosts.next(posts);
      this.postService.myCurrentPosts.next(posts.filter((post: PostResp) => post.status === 'unresolved'));
      this.postService.myResolvedPosts.next(posts.filter((post: PostResp) => post.status === 'resolved'));
    }, err => {
      console.log(err);
    });
  }

}
