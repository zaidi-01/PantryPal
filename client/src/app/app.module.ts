import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { AdminModule } from 'src/admin/admin.module';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { DialogComponent } from 'src/services/dialog/dialog.component';
import { SharedModule } from 'src/shared/shared.module';
import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { ApplicationPaths } from './app.constants';
import { FilterAndSortComponent } from './recipe-search/filter-and-sort/filter-and-sort.component';
import { FridgeComponent } from './fridge/fridge.component';
import { IngredientComponent } from './fridge/ingredient/ingredient.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeSummaryComponent } from './recipe-summary/recipe-summary.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  { path: '', pathMatch: 'full', redirectTo: appPaths.search },
  {
    path: appPaths.fridge,
    component: FridgeComponent,
  },
  {
    path: appPaths.search,
    component: RecipeSearchComponent,
  },
  {
    path: `${appPaths.recipe}/:id`,
    component: RecipeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FridgeComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeComponent,
    AlertComponent,
    DialogComponent,
    FilterAndSortComponent,
    HomeComponent, //TODO: remove in the future if not needed
    IngredientComponent,
    RecipeSummaryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    AdminModule,
    SharedModule,
    ScrollingModule,
    NgIf,
    NgFor,
    MatDialogModule,
    UpperCasePipe,
    ApiAuthorizationModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: ApplicationPaths, useClass: ApplicationPaths },
    {
      provide: ROUTES,
      useFactory: buildRoutes,
      deps: [ApplicationPaths],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
