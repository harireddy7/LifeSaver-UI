import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../posts.service';
import { PostResp } from '../../models/post-resp.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(private postService: PostsService, private router: Router) { }

  allposts: PostResp[];
  isLoading = true;
  noPOsts = false;

  ngOnInit() {
    this.postService.getAllPosts().subscribe((allPosts: PostResp[]) => {
      console.log(allPosts);
      this.allposts = allPosts;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.noPOsts = true;
    });
  }

  openPost (postId: string) {
    console.log('post-id: ' + postId);
    this.router.navigate([`/posts/post/${postId}`]);
  }

}
