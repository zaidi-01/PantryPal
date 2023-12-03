import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetailsEditComponent } from './recipe-details-edit.component';

describe('RecipeDetailsEditComponent', () => {
  let component: RecipeDetailsEditComponent;
  let fixture: ComponentFixture<RecipeDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailsEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
