import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedTracksComponent } from './liked-tracks.component';

describe('LikedTracksComponent', () => {
  let component: LikedTracksComponent;
  let fixture: ComponentFixture<LikedTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
