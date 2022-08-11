import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAlbumComponent } from './create-update-album.component';

describe('CreateUpdateAlbumComponent', () => {
  let component: CreateUpdateAlbumComponent;
  let fixture: ComponentFixture<CreateUpdateAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
