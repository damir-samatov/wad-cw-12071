import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteTicket,
  getManagerTickets,
  getUserSession,
  resetUserSession,
} from '../../utils';
import { API_URL } from '../../constants';
import { IManagerResponse, ITicketResponse } from '../../interfaces';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  private userSession = getUserSession();

  public isLoading = true;

  public tickets: ITicketResponse[] = [];
  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  async fetchTickets() {
    this.userSession = getUserSession();

    if (!this.userSession.hasSession) await this.redirectToLogin();

    try {
      this.tickets = await getManagerTickets(this.userSession.sessionId);
    } catch (e) {
      await this.redirectToLogin();
    }

    this.isLoading = false;
  }

  async deleteTicket(id: number) {
    const isSuccess = await deleteTicket(this.userSession.sessionId, id);
    if (isSuccess) await this.fetchTickets();
  }

  async goToDetails(id: number) {
    const isSuccess = await deleteTicket(this.userSession.sessionId, id);
    if (isSuccess) await this.fetchTickets();
  }

  async ngOnInit() {
    const userSession = getUserSession();
    await this.fetchTickets();
  }
}
