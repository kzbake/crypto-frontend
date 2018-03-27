import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToDbComponent } from './send-to-db.component';

describe('SendToDbComponent', () => {
  let component: SendToDbComponent;
  let fixture: ComponentFixture<SendToDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
