import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';

const routes: Routes = [
  {path: 'track', component:TrackComponent},
  {path: 'artist', component:ArtistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
