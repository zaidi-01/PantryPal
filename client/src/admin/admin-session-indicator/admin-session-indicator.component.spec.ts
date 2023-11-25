import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSessionIndicatorComponent } from './admin-session-indicator.component';

describe('AdminSessionIndicatorComponent', () => {
  let component: AdminSessionIndicatorComponent;
  let fixture: ComponentFixture<AdminSessionIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSessionIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSessionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
