export interface CameraEvent {
	data: Data;
	camera: string;
	end_time: number;
	false_positive: boolean;
	has_clip: boolean;
	has_snapshot: boolean;
	id: string;
	label: string;
	plus_id: string;
	retain_indefinitely: boolean;
	start_time: number;
	sub_label: string;
	thumbnail: string;
	zones: unknown[];
}

interface Data {
	box: number[];
	region: number[];
	score: number;
	top_score: number;
	type: string;
}
