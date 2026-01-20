import { Component, Input } from '@angular/core';
import { Experience } from '../types';

@Component({
  selector: 'app-experience-section',
  imports: [],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css',
})
export class ExperienceSection {
  @Input() experiences!: Experience[];

  getCompanyInitials(company: string): string {
    return company
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2);
  }
}
