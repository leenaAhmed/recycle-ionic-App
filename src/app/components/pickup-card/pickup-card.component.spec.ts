import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickupCardComponent } from './pickup-card.component';

describe('PickupCardComponent', () => {
  let component: PickupCardComponent;
  let fixture: ComponentFixture<PickupCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PickupCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PickupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
