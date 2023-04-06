import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee, ITicket, ITicketUpdate } from '../../interfaces';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
})
export class TicketEditComponent {
  @Input() ticket: ITicket;
  @Input() employees: IEmployee[];
  @Output() saveClick = new EventEmitter<ITicketUpdate>();
  @Output() cancelClick = new EventEmitter();
  updatedTicket: ITicketUpdate;

  ngOnInit() {
    this.updatedTicket = structuredClone(this.ticket);
  }

  onSaveClick() {
    this.saveClick.emit(this.updatedTicket);
  }

  onCancelClick() {
    this.cancelClick.emit();
  }
}
