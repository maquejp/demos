import { Component } from '@angular/core';
import { CertificationSection } from './certification-section/certification-section';
import {
  certifications as certificationsData,
  education as educationData,
  experiences as experiencesData,
  personalInfo as personalInfoData,
  skillCategories as skillCategoriesData,
} from './data';
import { EducationSection } from './education-section/education-section';
import { ExperienceSection } from './experience-section/experience-section';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { SkillsSection } from './skills-section/skills-section';
import { Certification, Education, Experience, PersonalInfo, SkillCategory } from './types';

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
