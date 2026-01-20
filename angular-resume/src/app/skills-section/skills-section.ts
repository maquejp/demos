import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../types';

@Component({
  selector: 'app-skills-section',
  imports: [CommonModule],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.css',
})
export class SkillsSection {
  @Input() skillCategories!: SkillCategory[];

  public getLevelIcon(level: string): string {
    switch (level) {
      case 'expert':
        return '⭐⭐⭐⭐⭐';
      case 'advanced':
        return '⭐⭐⭐⭐';
      case 'intermediate':
        return '⭐⭐⭐';
      case 'basic':
        return '⭐⭐';
      default:
        return '⭐⭐';
    }
  }

  public getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'from-accent-500 to-accent-600';
      case 'advanced':
        return 'from-primary-500 to-primary-600';
      case 'intermediate':
        return 'from-secondary-500 to-secondary-600';
      case 'basic':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  public getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      case 'basic':
        return 'w-2/5';
      default:
        return 'w-2/5';
    }
  };
}
