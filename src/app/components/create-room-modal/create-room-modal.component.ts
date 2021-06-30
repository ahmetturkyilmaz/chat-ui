import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateRoomModel } from '../../models/CreateRoomModel';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.css'],
})
export class CreateRoomModalComponent implements OnInit {
  model: CreateRoomModel = new CreateRoomModel('');

  constructor(
    private service: RoomService,
    public dialogRef: MatDialogRef<CreateRoomModalComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.create(this.model).subscribe(
      (value) => {
        this._snackBar.open('Room is created.', 'Done');
        this.dialogRef.close();
      },
      (error) => this._snackBar.open(error, 'Done')
    );
  }
}
