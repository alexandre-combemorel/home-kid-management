import { strapi } from "./base";
import type { PayloadActions, Score } from "./types";

export type ScoreTypeInput = {
	result: PayloadActions;
	momentDocumentId: string;
	variation: number;
};

export const setScore = ({
	momentDocumentId,
	result,
	variation,
}: ScoreTypeInput) => {
	return strapi.create<Score>("scores", {
		result,
		moment: momentDocumentId,
		variation,
	});
};

export const getScoresForTheWeek = ({ startDate }: { startDate: Date }) => {
	return strapi.find<Score[]>("scores", {
		filters: {
			createdAt: {
				$gt: startDate,
			},
		},
		populate: ["moment"],
	});
};
