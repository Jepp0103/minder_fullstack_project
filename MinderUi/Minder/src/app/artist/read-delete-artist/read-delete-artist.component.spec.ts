import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDeleteArtistComponent } from './read-delete-artist.component';

describe('ReadArtistComponent', () => {
  let component: ReadDeleteArtistComponent;
  let fixture: ComponentFixture<ReadDeleteArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDeleteArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadDeleteArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
