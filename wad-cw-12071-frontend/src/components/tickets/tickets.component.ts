import { Component, Input } from '@angular/core';
import { ITicket } from '../../interfaces';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  @Input() tickets: ITicket[];
  @Input() role: 'manager' | 'employee';
}
