import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDeleteTrackComponent } from './read-delete-track.component';

describe('ReadTrackComponent', () => {
  let component: ReadDeleteTrackComponent;
  let fixture: ComponentFixture<ReadDeleteTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDeleteTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadDeleteTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
