import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSpecificInfo } from './get-specific-info';

describe('GetSpecificInfo', () => {
  let component: GetSpecificInfo;
  let fixture: ComponentFixture<GetSpecificInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSpecificInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSpecificInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
