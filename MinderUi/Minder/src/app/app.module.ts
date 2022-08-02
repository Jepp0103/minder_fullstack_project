import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { ReadTrackComponent } from './track/read-track/read-track.component';
import { CreateUpdateTrackComponent } from './track/create-update-track/create-update-track.component';
import { ArtistComponent } from './artist/artist.component';
import { ReadDeleteArtistComponent } from './artist/read-delete-artist/read-delete-artist.component';
import { CreateUpdateArtistComponent } from './artist/create-update-artist/create-update-artist.component';
import { ArtistApiService } from './api_services/artist-api.service';
import { TrackApiService } from './api_services/track-api.service';


@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    ReadTrackComponent,
    CreateUpdateTrackComponent,
    ArtistComponent,
    ReadDeleteArtistComponent,
    CreateUpdateArtistComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ArtistApiService, TrackApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
