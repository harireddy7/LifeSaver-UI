import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewPost } from './models/new-post.model';
import { PostResp } from './models/post-resp.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  apiPath = 'https://life-saver.herokuapp.com';

  myAllPosts = new BehaviorSubject<PostResp[]>([]);
  myCurrentPosts = new BehaviorSubject<PostResp[]>([]);
  myResolvedPosts = new BehaviorSubject<PostResp[]>([]);

  createPost(post: NewPost) {
    // console.log(localStorage.getItem('token'));
    return this.http.post(`${this.apiPath}/posts/create`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  getAllPosts() {
    return this.http.get(`${this.apiPath}/allposts`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }


  getMyPosts() {
    return this.http.get(`${this.apiPath}/posts`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  getPostData (postId: string) {
    return this.http.get(`${this.apiPath}/posts/${postId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  resolvePost(id: string) {
    return this.http.patch(`${this.apiPath}/posts/${id}`, { status: 'resolved'}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  updatePost(id: string, post) {
    return this.http.patch(`${this.apiPath}/posts/${id}`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  deletePost(id: string) {
    return this.http.delete(`${this.apiPath}/posts/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }

  sendMail(group: string) {
    return this.http.post(`${this.apiPath}/notifyDonor/${group}`, '', {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}` // later get this token from store
      })
    });
  }



// post['status'] === 'Unresolved'

}
