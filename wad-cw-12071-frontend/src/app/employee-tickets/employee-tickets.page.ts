import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getTickets, getUserSession } from '../../requests';
import { ITicket } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-employee-tickets-page',
  templateUrl: './employee-tickets.page.html',
})
export class EmployeeTicketsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  tickets: ITicket[];

  async ngOnInit() {
    return await this.fetchTickets();
  }

  async fetchTickets() {
    this.isLoading = true;
    try {
      this.tickets = await getTickets(this.userSession.sessionId, false);
    } catch (e) {
      await this.redirectToLogin();
    }
    this.isLoading = false;
  }

  private async redirectToLogin() {
    resetUserSession();
    await this.router.navigateByUrl('/login');
  }
}
