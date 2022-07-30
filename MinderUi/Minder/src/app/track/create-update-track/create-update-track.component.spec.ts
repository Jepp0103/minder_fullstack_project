import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTrackComponent } from './create-update-track.component';

describe('CreateUpdateTrackComponent', () => {
  let component: CreateUpdateTrackComponent;
  let fixture: ComponentFixture<CreateUpdateTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
