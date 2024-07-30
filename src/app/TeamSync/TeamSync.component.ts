import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { teamMembers } from '../../shared/model/teamMembers';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-team-sync',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './TeamSync.component.html',
  styleUrls: ['./TeamSync.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSyncComponent {
  teamMembers = [
    teamMembers.Noam_Choen,
    teamMembers.Tamar_Levi,
    teamMembers.Eitan_Avrahan,
    teamMembers.Maya_David,
    teamMembers.Yonah_Shalev,
    teamMembers.Lior_Baruch,
    teamMembers.Shira_Choen,
    teamMembers.Itai_Gilboa,
  ];

  teamMembersOptions = Object.values(teamMembers);

  deleteMember(index: number) {
    this.teamMembers.splice(index, 1);
  }

  addTeamMember(member: teamMembers) {
    this.teamMembers.push(member);
  }
}
export class CardOverviewExample {}