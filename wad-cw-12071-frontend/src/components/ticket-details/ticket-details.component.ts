import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee, ITicket } from '../../interfaces';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
})
export class TicketDetailsComponent {
  @Input() ticket: ITicket;
  @Input() assignedEmployee: IEmployee;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter<number>();

  onEditClick = () => {
    this.editClick.emit();
  };
  onDeleteClick = () => {
    this.deleteClick.emit(this.ticket.id);
  };
  @Input() role: 'manager' | 'employee';
}
