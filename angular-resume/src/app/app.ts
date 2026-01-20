import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { CertificationSection } from './certification-section/certification-section';
import { EducationSection } from './education-section/education-section';
import { ExperienceSection } from './experience-section/experience-section';
import { SkillsSection } from './skills-section/skills-section';
import { Certification, Education, Experience, PersonalInfo, SkillCategory } from './types';
import {
  personalInfo as personalInfoData,
  experiences as experiencesData,
  skillCategories as skillCategoriesData,
  education as educationData,
  certifications as certificationsData,
} from './data';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Footer,
    CertificationSection,
    EducationSection,
    ExperienceSection,
    SkillsSection,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  personalInfo: PersonalInfo = personalInfoData as PersonalInfo;
  experiences: Experience[] = experiencesData as Experience[];
  skillCategories: SkillCategory[] = skillCategoriesData as SkillCategory[];
  educations: Education[] = educationData as Education[];
  certifications: Certification[] = certificationsData as Certification[];
}
