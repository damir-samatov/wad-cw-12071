import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee, ITicket } from '../../interfaces';

@Component({
  selector: 'app-employee-ticket-details',
  templateUrl: './employee-ticket-details.component.html',
})
export class EmployeeTicketDetailsComponent {
  @Input() ticket: ITicket;
  @Input() assignedEmployee: IEmployee;
  @Output() onUpdateStatusEvent = new EventEmitter();

  newStatus: string;

  ngOnInit() {
    this.newStatus = this.ticket.status;
  }

  onUpdateStatus = () => {
    this.onUpdateStatusEvent.emit(this.newStatus);
  };

  @Input() role: 'manager' | 'employee';
}
