import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserModel } from '../../models/UserModel';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  public formControl = new FormControl();
  public filteredOptions!: Observable<UserModel[]>;
  @Input() roomId!: number;
  @Input() users!: UserModel[];
  @Output() onUserAdd = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.users.slice()))
    );
  }

  displayFn(user: UserModel): string {
    return user && user.name ? user.name : '';
  }

  onUserSelected(event: MatAutocompleteSelectedEvent) {
    const { id } = event.option.value;
    this.onUserAdd.emit(id);
    this.formControl.reset();
  }

  private _filter(name: string): UserModel[] {
    const filterValue = name.toLowerCase();

    return this.users.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
