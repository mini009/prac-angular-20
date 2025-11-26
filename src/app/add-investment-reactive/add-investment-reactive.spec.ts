import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentReactive } from './add-investment-reactive';

describe('AddInvestmentReactive', () => {
  let component: AddInvestmentReactive;
  let fixture: ComponentFixture<AddInvestmentReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestmentReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestmentReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
