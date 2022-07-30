import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTrackComponent } from './read-track.component';

describe('ReadTrackComponent', () => {
  let component: ReadTrackComponent;
  let fixture: ComponentFixture<ReadTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
