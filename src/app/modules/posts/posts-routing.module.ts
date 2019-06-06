import { PostComponent } from './components/post/post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MypostContainerComponent } from './components/myposts/mypost-container/mypost-container.component';
import { CurrentComponent } from './components/myposts/current/current.component';
import { ResolvedComponent } from './components/myposts/resolved/resolved.component';
import { NewPostComponent } from './components/new-post/new-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'timeline', pathMatch: 'full'},
  { path: 'timeline', component: TimelineComponent },
  { path: 'post/:id', component: PostComponent, pathMatch: 'full' },
  { path: 'myposts', component: MypostContainerComponent, children: [
    { path: '', redirectTo: 'current', pathMatch: 'full'},
    { path: 'current', component: CurrentComponent},
    { path: 'resolved', component: ResolvedComponent}
  ]},
  { path: 'create', component: NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }

// posts/myposts/current
// posts/myposts/resolved
