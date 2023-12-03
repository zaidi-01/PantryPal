import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeAttributeComponent } from './recipe-attribute.component';

describe('RecipeAttributeComponent', () => {
  let component: RecipeAttributeComponent;
  let fixture: ComponentFixture<RecipeAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAttributeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
