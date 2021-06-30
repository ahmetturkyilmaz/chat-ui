import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageComponent } from './components/message/message.component';
import { CreateRoomModalComponent } from './components/create-room-modal/create-room-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { RegisterComponent } from './components/register/register.component';
import { RoomService } from './services/room.service';
import { MessageService } from './services/message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MessageComponent,
    CreateRoomModalComponent,
    RoomDetailComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    UserService,
    RoomService,
    MessageService,
    {
      provide: 'CanActivateRoute',
      useValue: () => window.localStorage.getItem('AccessToken') !== null,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
