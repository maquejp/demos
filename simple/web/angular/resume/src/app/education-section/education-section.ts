import { Component, Input } from '@angular/core';
import { Education } from '../types';

@Component({
  selector: 'app-education-section',
  imports: [],
  templateUrl: './education-section.html',
  styleUrl: './education-section.css',
})
export class EducationSection {
  @Input() educations!: Education[];
}
