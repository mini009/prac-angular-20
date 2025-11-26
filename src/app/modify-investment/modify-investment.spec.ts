import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInvestment } from './modify-investment';

describe('ModifyInvestment', () => {
  let component: ModifyInvestment;
  let fixture: ComponentFixture<ModifyInvestment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyInvestment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyInvestment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
