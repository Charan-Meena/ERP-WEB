import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
  private timeout: any;
  private readonly timeoutDuration = 15 * 60 * 1000; // 2 minutes

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
  }

  startWatching(): void {
    this.resetTimer();

    // Track user activity
    document.body.addEventListener('mousemove', () => this.resetTimer());
    document.body.addEventListener('keypress', () => this.resetTimer());
    document.body.addEventListener('click', () => this.resetTimer());
  }

  resetTimer(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.ngZone.run(() => {
        // Clear session or token if needed
        localStorage.removeItem('JWT_Token');
        localStorage.removeItem('user_session');
        this.router.navigate(['/login']);
      });
    }, this.timeoutDuration);
  }

  stopWatching(): void {
    clearTimeout(this.timeout);
    document.body.removeEventListener('mousemove', this.resetTimer);
    document.body.removeEventListener('keypress', this.resetTimer);
    document.body.removeEventListener('click', this.resetTimer);
  }
}
