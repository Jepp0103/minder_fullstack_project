import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadArtistComponent } from './read-artist.component';

describe('ReadArtistComponent', () => {
  let component: ReadArtistComponent;
  let fixture: ComponentFixture<ReadArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
