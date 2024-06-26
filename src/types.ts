export type Project = {
	name: string;
	description: string;
	longDescription: string;
	image: string;
	video?: string;
	videoDescription?: string;
	slug: string;
	github?: string;
	website?: string;
	tags: string[];
	stack: string[];
	gallery?: string[];
};

export type Tool = {
	name: string;
	description: string;
	slug: string;
};

export type SkillType = {
	name: string;
	since: number;
};

export type getHeightProps = {
	since: number;
	maxExperience: number;
};

export type StateType = {
	show: null | string;
	errors: { name: null | string; email: null | string; message: null | string };
	canSendMail?: boolean;
	token?: string | null;
	formKey: number;
};
export type ActionType = {
	type: string;
	payload?: string | null;
};
