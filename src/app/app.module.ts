import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedService} from './services/shared/shared.service';
import {NgbdSortableHeader} from './sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {NgApexchartsModule} from 'ng-apexcharts';
import {NestableModule} from 'ngx-nestable';
import {NgxSpinnerModule} from "ngx-spinner";
import {LightboxModule} from 'ngx-lightbox';

import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {MetismenuAngularModule} from "@metismenu/angular";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {NgxDropzoneModule} from 'ngx-dropzone';
import {CarouselModule} from 'ngx-owl-carousel-o';

import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';


/* #########################  SITE PAGES COMPONENT ###################*/
import {AdminComponent} from './components/admin/admin.component';
import {NavHeaderComponent} from './components/nav-header/nav-header.component';
import {HeaderComponent} from './components/header/header.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FooterComponent} from './components/footer/footer.component';
import {CarouselNavigationComponent} from './components/carousel-navigation/carousel-navigation.component';

import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {Error403Component} from './components/error403/error403.component';
import {Error404Component} from './components/error404/error404.component';
import {AuthenticationInterceptor} from "./helpers/authentication.interceptor";
import {HomeComponent} from './components/home/home.component';
import {JwPaginationModule} from "jw-angular-pagination";
import { ReservationsComponent } from './components/reservations/reservations.component';


FullCalendarModule.registerPlugins([
	dayGridPlugin,
	timeGridPlugin,
	listPlugin,
	interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    AdminComponent,
    NavHeaderComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    CarouselNavigationComponent,
	RegisterComponent,
	LoginComponent,
	Error403Component,
	Error404Component,
      HomeComponent,
      ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    NgApexchartsModule,
    NestableModule,
    NgxSpinnerModule,
    LightboxModule,
    FullCalendarModule,
    MetismenuAngularModule,
    PerfectScrollbarModule,
    NgxDropzoneModule,
    CarouselModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTabsModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    DragDropModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatTreeModule,
    JwPaginationModule
  ],
  providers: [
    DatePipe,
		SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
