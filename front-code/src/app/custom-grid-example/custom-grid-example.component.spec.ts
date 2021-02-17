import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGridExampleComponent } from './custom-grid-example.component';

describe('CustomGridExampleComponent', () => {
  let component: CustomGridExampleComponent;
  let fixture: ComponentFixture<CustomGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
