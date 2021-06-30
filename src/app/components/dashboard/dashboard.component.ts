import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../models/RoomModel';
import { MessageModel } from '../../models/MessageModel';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomModalComponent } from '../create-room-modal/create-room-modal.component';
import { RoomService } from '../../services/room.service';
import { MessageService } from '../../services/message.service';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rooms: RoomModel[] = [];
  selectedRoom!: RoomModel;
  selectedRoomMessages: MessageModel[] = [];
  users: UserModel[] = [];
  messageInterval: number | null = null;

  constructor(
    private userService: UserService,
    public roomService: RoomService,
    public messageService: MessageService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }

  loadRooms() {
    this.roomService.getAll().subscribe((value) => {
      this.rooms = value.data;
    });
  }

  loadMessages(roomId: number) {
    this.messageService.getMessages(roomId).subscribe((response) => {
      this.selectedRoomMessages = response.data;
    });
  }

  openCreateRoomDialog() {
    const dialogRef = this.dialog.open(CreateRoomModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.loadRooms();
    });
  }

  selectRoom(room: RoomModel) {
    this.selectedRoom = room;
    this.loadMessages(this.selectedRoom.id);

    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }

    this.messageInterval = setInterval(() => {
      this.loadMessages(this.selectedRoom.id);
    }, 5000);
  }

  onMessageAdd() {
    this.loadMessages(this.selectedRoom.id);
  }

  onUserAdd(userId: number) {
    this.roomService.invite(this.selectedRoom.id, userId).subscribe(
      () => {
        this._snackBar.open('User is invited to the room.', 'Done');
      },
      (error) => this._snackBar.open(error, 'Done')
    );
  }
}
