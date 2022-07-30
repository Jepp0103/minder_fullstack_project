import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { ReadTrackComponent } from './track/read-track/read-track.component';
import { CreateUpdateTrackComponent } from './track/create-update-track/create-update-track.component';
import { ArtistComponent } from './artist/artist.component';
import { ReadArtistComponent } from './artist/read-artist/read-artist.component';
import { CreateUpdateArtistComponent } from './artist/create-update-artist/create-update-artist.component';
import { SharedService } from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    ReadTrackComponent,
    CreateUpdateTrackComponent,
    ArtistComponent,
    ReadArtistComponent,
    CreateUpdateArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
