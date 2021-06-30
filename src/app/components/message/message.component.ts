import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MessageModel } from '../../models/MessageModel';
import { MessageService } from '../../services/message.service';
import { SendMessageModel } from '../../models/SendMessageModel';
import { UserModel } from '../../models/UserModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() messages!: MessageModel[];
  @Input() roomId!: number;
  @Output() onMessageAdd = new EventEmitter<void>();
  @Input() users: UserModel[] = [];

  public message!: string;

  constructor(
    private service: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const lenCurrent = changes?.messages?.currentValue?.length;
    const lenPrevious = changes?.messages?.previousValue?.length;
    if (lenCurrent > lenPrevious) {
      const objDiv = document.getElementById('inner-message-content');
      if (objDiv) {
        setTimeout(() => {
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 250);
      }
    }
  }

  onSubmit(): void {
    this.service
      .sendMessage(new SendMessageModel(this.message, this.roomId))
      .subscribe(
        () => {
          this.message = '';
          this.onMessageAdd.emit();
        },
        (error) => this._snackBar.open(error, 'Done')
      );
  }

  getUserName(userId: number): string {
    return this.users.find((item) => item.id === userId)?.name ?? 'N/A';
  }
}
