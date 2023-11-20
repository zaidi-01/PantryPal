import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AppComponent } from './app.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FridgeComponent } from './fridge/fridge.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FridgeComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: RecipeSearchComponent, pathMatch: 'full' },
      { path: 'fridge', component: FridgeComponent },
      { path: 'recipe/:id', component: RecipeComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
