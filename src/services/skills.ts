import skillsData from "@data/skills.json";
import type { SkillType } from "@types";

/**
 * Structure of the skills JSON data
 */
interface SkillsData {
  languages: SkillType[];
  other: SkillType[];
  soft: SkillType[];
}

/**
 * Service class for managing and calculating skill-related data
 *
 * Handles skill experience calculations and provides utility methods
 * for determining visual representations of skill proficiency.
 */
class Skills {
  /** Skills data loaded from JSON */
  private skillsData: SkillsData;

  /** Current year for experience calculations */
  year = new Date().getFullYear();

  /** Maximum years of experience across all skills */
  maxExperience: number;

  /**
   * Initializes the Skills service
   * Calculates the maximum experience by finding the earliest skill start year
   */
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

  /**
   * Calculates a CSS width class based on years of experience
   *
   * Maps experience percentage to Tailwind width classes:
   * - < 10%: w-10
   * - 10-24%: w-25
   * - 25-49%: w-50
   * - 50-74%: w-75
   * - 75-84%: w-85
   * - >= 85%: w-100
   *
   * @param {number} since - The year the skill was acquired (0 for skills without dates)
   * @returns {string} Tailwind CSS width class or empty string for undated skills
   *
   * @example
   * // For a skill acquired in 2020 when max experience is 15 years
   * getHeight(2020) // returns "w-25" (4 years / 15 = 26%)
   */
  getHeight = (since: number): string => {
    if (since === 0) {return "";}

    const years = this.year - since;
    const p = Math.floor((years * 100) / this.maxExperience);

    /**
     * Maps experience percentage to width value
     * @param {number} percentage - Experience as percentage of max experience
     * @returns {number} Width value for Tailwind class
     */
    const getSize = (percentage: number): number => {
      if (percentage < 10) {return 10;}
      if (percentage >= 10 && percentage < 25) {return 25;}
      if (percentage >= 25 && percentage < 50) {return 50;}
      if (percentage >= 50 && percentage < 75) {return 75;}
      if (percentage >= 75 && percentage < 85) {return 85;}
      return 100;
    };

    const size = getSize(p);
    const classSize = `w-${size}`;

    return classSize;
  };
}

export default Skills;
