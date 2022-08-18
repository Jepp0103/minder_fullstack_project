import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LikedTracksComponent } from './track/liked-tracks/liked-tracks.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'adminlogin', component:AdminLoginComponent},
  {path: 'signup', component:UserComponent},
  {path: 'track', component:TrackComponent},
  {path: 'likedtracks', component:LikedTracksComponent},
  {path: 'artist', component:ArtistComponent},
  {path: 'album', component:AlbumComponent},
  {path: 'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
