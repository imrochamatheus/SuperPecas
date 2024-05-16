import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartsComponent } from './edit-parts.component';

describe('EditPartsComponent', () => {
  let component: EditPartsComponent;
  let fixture: ComponentFixture<EditPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
