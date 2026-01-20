import { Component, Input } from '@angular/core';
import { Certification } from '../types';

@Component({
  selector: 'app-certification-section',
  imports: [],
  templateUrl: './certification-section.html',
  styleUrl: './certification-section.css',
})
export class CertificationSection {
  @Input() certifications!: Certification[];
}
