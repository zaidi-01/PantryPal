import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Recipe, RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService],
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get a recipe by id', () => {
    const recipeId = 1;
    const mockRecipe: Recipe = {
      id: recipeId,
      name: 'Test Recipe',
      description: 'This is a test recipe',
      ingredients: 'Ingredient 1, Ingredient 2',
      directions: 'Step 1, Step 2',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    service.getRecipe(recipeId).subscribe((recipe: Recipe) => {
      expect(recipe).toEqual(mockRecipe);
    });

    const req = httpMock.expectOne(`/api/recipes/${recipeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipe);
  });
});
