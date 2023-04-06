import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteTicket,
  getTickets,
  getUserSession,
  resetUserSession,
} from '../../utils';
import { ITicket } from '../../interfaces';

@Component({
  selector: 'app-manager-tickets-page',
  templateUrl: './manager-tickets.page.html',
})
export class ManagerTicketsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  tickets: ITicket[] = [];

  async ngOnInit() {
    if (!this.userSession.hasSession) return await this.redirectToLogin();
    return await this.fetchTickets();
  }

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  async fetchTickets() {
    try {
      this.tickets = await getTickets(this.userSession.sessionId, true);
    } catch {
      await this.redirectToLogin();
    }
    this.isLoading = false;
  }
}
