import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelComponent } from './new-travel.component';

describe('NewTravelComponent', () => {
  let component: NewTravelComponent;
  let fixture: ComponentFixture<NewTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
