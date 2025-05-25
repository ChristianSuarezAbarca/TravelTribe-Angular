import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsPageComponent } from './travels-page.component';

describe('TravelsPageComponent', () => {
  let component: TravelsPageComponent;
  let fixture: ComponentFixture<TravelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
