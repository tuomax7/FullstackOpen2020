export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartDescribed {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartRequirements extends CoursePartDescribed {
	requirements: string[];
  kind: "special";
}

export interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;