import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureTravelsComponent } from './adventure-travels.component';

describe('AdventureTravelsComponent', () => {
  let component: AdventureTravelsComponent;
  let fixture: ComponentFixture<AdventureTravelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureTravelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureTravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
