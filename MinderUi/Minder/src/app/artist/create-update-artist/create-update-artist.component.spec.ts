import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateArtistComponent } from './create-update-artist.component';

describe('CreateUpdateArtistComponent', () => {
  let component: CreateUpdateArtistComponent;
  let fixture: ComponentFixture<CreateUpdateArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
