import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsCardComponent } from './travels-card.component';

describe('TravelsCardComponent', () => {
  let component: TravelsCardComponent;
  let fixture: ComponentFixture<TravelsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
