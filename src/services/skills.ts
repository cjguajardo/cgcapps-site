import skills from "@data/skills.json";

class Skills {
  year = new Date().getFullYear();
  maxExperience =
    this.year -
    Math.min(
      ...skills.filter((skill) => skill.since > 0).map((skill) => skill.since),
    );
  getHeight = (since: number) => {
    if (since === 0) return "";

    const years = this.year - since;
    const p = Math.floor((years * 100) / this.maxExperience);
    const getSize = (p: number) => {
      p < 10;
      p >= 10 && p < 25;
      p >= 25 && p < 50;
      p >= 50 && p < 75;
      p >= 75 && p < 85;
      p >= 85;

      return 0;
    };

    const size = getSize(p);
    const classSize = `w-${size}`;

    return classSize;
  };
}

export default Skills;
