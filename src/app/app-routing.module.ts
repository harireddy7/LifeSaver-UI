import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsGuard } from './modules/posts/guards/posts.guard';

const routes: Routes = [
  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'posts', canActivate: [PostsGuard], loadChildren: './modules/posts/posts.module#PostsModule' },
  { path: 'profile', canActivate: [PostsGuard], loadChildren: './modules/profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
