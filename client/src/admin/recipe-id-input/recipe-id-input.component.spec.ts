import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeIdInputComponent } from './recipe-id-input.component';

describe('RecipeIdInputComponent', () => {
  let component: RecipeIdInputComponent;
  let fixture: ComponentFixture<RecipeIdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeIdInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
