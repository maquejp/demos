import React, { useEffect, useState } from "react";

import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  Footer,
  Header,
  SkillsSection,
} from "./components";

import {
  certifications,
  education,
  experiences,
  personalInfo,
  skillCategories as skillCategoriesData,
} from "./data";

import type { SkillCategory } from "./types";

import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const skillCategories = skillCategoriesData as SkillCategory[];

  useEffect(() => {
    try {
      // Data loaded successfully
    } catch (error) {
      console.error("Failed to load resume data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 via-secondary-50 to-accent-50">
      <Header {...personalInfo} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skillCategories={skillCategories} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} />
      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default App;
