import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { ReadDeleteTrackComponent } from './track/read-delete-track/read-delete-track.component';
import { CreateUpdateTrackComponent } from './track/create-update-track/create-update-track.component';
import { ArtistComponent } from './artist/artist.component';
import { ReadDeleteArtistComponent } from './artist/read-delete-artist/read-delete-artist.component';
import { CreateUpdateArtistComponent } from './artist/create-update-artist/create-update-artist.component';
import { ArtistApiService } from './api-services/artist-api.service';
import { TrackApiService } from './api-services/track-api.service';
import { AlbumApiService } from './api-services/album-api.service';
import { AuthenticationApiService } from './api-services/authentication-api.service';
import { AlbumComponent } from './album/album.component';
import { ReadDeleteAlbumComponent } from './album/read-delete-album/read-delete-album.component';
import { CreateUpdateAlbumComponent } from './album/create-update-album/create-update-album.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LikedTracksComponent } from './track/liked-tracks/liked-tracks.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatchComponent } from './match/match.component';
import { MessageComponent } from './match/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    ReadDeleteTrackComponent,
    CreateUpdateTrackComponent,
    ArtistComponent,
    ReadDeleteArtistComponent,
    CreateUpdateArtistComponent,
    AlbumComponent,
    ReadDeleteAlbumComponent,
    CreateUpdateAlbumComponent,
    LoginComponent,
    UserComponent,
    AdminNavbarComponent,
    AdminLoginComponent,
    UserNavbarComponent,
    CarouselComponent,
    LikedTracksComponent,
    UserProfileComponent,
    MatchComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ArtistApiService, TrackApiService, AlbumApiService, AuthenticationApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
