import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { io } from 'socket.io-client';
import { N8nAPI } from '../../services/n8n';
import { N8NExecutionStore } from '../../stores/n8n-execution-store';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
  ],
  providers: [N8NExecutionStore],
  templateUrl: './home.html',
  styleUrl: './home.css',
  host: {
    class: 'block',
  },
})
export class Home {
  readonly cdr = inject(ChangeDetectorRef);

  showLoading = signal(false);

  // n8n
  readonly #n8nAPI = inject(N8nAPI);
  readonly n8nExecutionStore = inject(N8NExecutionStore);

  // Prompt
  prompt = 'Review the latest master-branch commit and produce a summary.';

  // Emails
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly emails = signal<any[]>(['hoainhaannguyen@gmail.com']);

  // Socket.IO
  socket = io('http://localhost:3000', {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    autoConnect: false,
  });

  constructor() {
    afterNextRender(() => {
      this.socket.connect();

      this.socket.on('message', (message) => {
        console.log('Socket.IO message ::', message);

        const { execution } = message;

        if (execution) {
          this.n8nExecutionStore.add({
            short: execution.prompt.split('\n')[0],
            data: execution,
            date: new Date().toString(),
            status: 'Success',
          });

          this.cdr.detectChanges();
        }
      });
    });
  }

  addEmail(event: any) {
    const value = (event.value || '').trim();

    // Add our email
    if (value) {
      this.emails.update((emails) => [...emails, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeEmail(email: any) {
    this.emails.update((emails) => {
      const index = emails.indexOf(email);
      if (index < 0) {
        return emails;
      }

      emails.splice(index, 1);
      return [...emails];
    });
  }

  editEmail(email: any, event: any) {
    const value = event.value.trim();

    // Remove email if it no longer has a value
    if (!value) {
      this.removeEmail(email);
      return;
    }

    // Edit existing email
    this.emails.update((emails) => {
      const index = emails.indexOf(email);
      if (index >= 0) {
        emails[index] = value;
        return [...emails];
      }
      return emails;
    });
  }

  sendPrompt() {
    const submitData = {
      prompt: this.prompt,
      recipients: {
        emails: this.emails(),
        channels: ['MS Teams > RnD Discussion > General'],
      },
    };

    this.showLoading.set(true);
    this.#n8nAPI.triggerWebhook(submitData).subscribe(() => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);

        this.showLoading.set(false);
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.socket?.disconnect();
  }
}
