import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartsComponent } from './create-parts.component';

describe('CreatePartsComponent', () => {
  let component: CreatePartsComponent;
  let fixture: ComponentFixture<CreatePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
