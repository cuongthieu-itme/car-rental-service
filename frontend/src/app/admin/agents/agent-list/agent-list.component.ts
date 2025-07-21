import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../core/services/agent.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agent-list.component.html',
  imports: [CommonModule],
})
export class AgentsListComponent implements OnInit {
  agents: any[] = [];
  loading = true;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.getAllAgents().subscribe((data) => {
      this.agents = data;
      this.loading = false;
    });
  }

  approve(id: string): void {
    this.agentService.approveAgent(id).subscribe(() => {
      this.updateStatus(id, 'APPROVED');
    });
  }

  suspend(id: string): void {
    this.agentService.suspendAgent(id).subscribe(() => {
      this.updateStatus(id, 'SUSPENDED');
    });
  }

  viewAgent(id: string): void {
    // TODO: Implement view agent details logic
    console.log('View agent', id);
  }

  editAgent(id: string): void {
    // TODO: Implement edit agent logic
    console.log('Edit agent', id);
  }

  deleteAgent(id: string): void {
    // TODO: Implement delete agent logic
    console.log('Delete agent', id);
  }

  private updateStatus(id: string, status: string): void {
    this.agents = this.agents.map((a) => (a.id === id ? { ...a, status } : a));
  }
}
