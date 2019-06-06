import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostComponent } from './components/post/post.component';
import { CurrentComponent } from './components/myposts/current/current.component';
import { MypostContainerComponent } from './components/myposts/mypost-container/mypost-container.component';
import { ResolvedComponent } from './components/myposts/resolved/resolved.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [
    TimelineComponent,
    CurrentComponent,
    ResolvedComponent,
    NewPostComponent,
    MypostContainerComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule, MatProgressSpinnerModule,
    PostsRoutingModule
  ],
  exports: [
    TimelineComponent,
    CurrentComponent,
    ResolvedComponent
  ]
})
export class PostsModule { }
