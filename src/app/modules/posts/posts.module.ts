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
import { MatDialogModule, MatButtonModule, MatCardModule } from '@angular/material';
import { DialogBoxComponent } from './components/post/dialog-box/mat-dialog.component';

@NgModule({
  declarations: [
    TimelineComponent,
    CurrentComponent,
    ResolvedComponent,
    NewPostComponent,
    MypostContainerComponent,
    PostComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatCardModule,
    PostsRoutingModule
  ],
  exports: [
    TimelineComponent,
    CurrentComponent,
    ResolvedComponent
  ],
  entryComponents: [DialogBoxComponent]
})
export class PostsModule { }
