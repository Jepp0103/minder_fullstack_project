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
import { ReadArtistComponent } from './artist/read-artist/read-artist.component';
import { CreateArtistComponent } from './artist/create-artist/create-artist.component';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    ReadTrackComponent,
    CreateUpdateTrackComponent,
    ArtistComponent,
    ReadArtistComponent,
    CreateArtistComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule { }
