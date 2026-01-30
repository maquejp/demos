import { Component, Input } from '@angular/core';
import { PersonalInfo } from '../types';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() personalInfo!: PersonalInfo;

  get name(): string {
    return this.personalInfo.name;
  }

  get nameSplitInitials(): string {
    return this.personalInfo.name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  get title(): string | undefined {
    return this.personalInfo.title;
  }

  get location(): string | undefined {
    return this.personalInfo.location;
  }

  get email(): string | undefined {
    return this.personalInfo.email;
  }

  get phone(): string | undefined {
    return this.personalInfo.phone;
  }

  get linkedin(): string | undefined {
    return this.personalInfo.linkedin;
  }
}
