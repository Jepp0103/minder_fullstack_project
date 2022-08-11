import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDeleteAlbumComponent } from './read-delete-album.component';

describe('ReadDeleteAlbumComponent', () => {
  let component: ReadDeleteAlbumComponent;
  let fixture: ComponentFixture<ReadDeleteAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDeleteAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadDeleteAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
