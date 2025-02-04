const momentMatin = require("../data/hkm-data/matin.json");
const momentMidi = require("../data/hkm-data/midi.json");
const momentApresMidi = require("../data/hkm-data/apresmidi.json");
const momentSoir = require("../data/hkm-data/soir.json");
const momentSoirCouche = require("../data/hkm-data/soircouche.json");

const returnActions = (tasks) => {
	const listActions = [];
	tasks.forEach((task) => {
		task.actions.forEach((action) => {
			listActions.push(action.title);
		});
	});
	return listActions;
};

const main = () => {
	const listAction = [
		...returnActions(momentMatin.tasks),
		...returnActions(momentMidi.tasks),
		...returnActions(momentApresMidi.tasks),
		...returnActions(momentSoir.tasks),
		...returnActions(momentSoirCouche.tasks),
	];
	listAction.sort();
	const listActionUpdated = [...new Set(listAction)];
	listActionUpdated.sort();
	let counter = 1;
	console.log(
		"🚀 ~ main ~ listActionUpdated:",
		listActionUpdated.map((a) => {
			const obj = { id: counter, title: a };
			counter += 2;
			return obj;
		}),
	);
};

main();
