import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTravelsComponent } from './popular-travels.component';

describe('PopularTravelsComponent', () => {
  let component: PopularTravelsComponent;
  let fixture: ComponentFixture<PopularTravelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularTravelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularTravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
