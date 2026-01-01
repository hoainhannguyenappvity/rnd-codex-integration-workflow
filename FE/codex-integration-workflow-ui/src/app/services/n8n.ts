import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apis } from '../enums/apis';

@Injectable({
  providedIn: 'root',
})
export class N8nApi {
  readonly http = inject(HttpClient);

  triggerWorkflow(data: any) {
    return this.http.post(apis.n8n.webhook.codexIntegrationWorkflow, data);
  }
}
