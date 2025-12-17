import skillsData from "@data/skills.json";
import type { SkillType } from "@types";

// Define the structure of our skills JSON
interface SkillsData {
  languages: SkillType[];
  other: SkillType[];
  soft: SkillType[];
}

class Skills {
  private skillsData: SkillsData;
  year = new Date().getFullYear();
  maxExperience: number;

  constructor() {
    this.skillsData = skillsData as SkillsData;

    // Get all skills with a since date (exclude soft skills with since: 0)
    const allSkills = [
      ...this.skillsData.languages,
      ...this.skillsData.other,
      ...this.skillsData.soft,
    ];

    const skillsWithDates = allSkills.filter((skill) => skill.since > 0);

    this.maxExperience =
      this.year - Math.min(...skillsWithDates.map((skill) => skill.since));
  }

  getHeight = (since: number): string => {
    if (since === 0) return "";

    const years = this.year - since;
    const p = Math.floor((years * 100) / this.maxExperience);

    const getSize = (percentage: number): number => {
      if (percentage < 10) return 10;
      if (percentage >= 10 && percentage < 25) return 25;
      if (percentage >= 25 && percentage < 50) return 50;
      if (percentage >= 50 && percentage < 75) return 75;
      if (percentage >= 75 && percentage < 85) return 85;
      return 100;
    };

    const size = getSize(p);
    const classSize = `w-${size}`;

    return classSize;
  };
}

export default Skills;
