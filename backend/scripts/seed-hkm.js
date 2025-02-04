const momentMatin = require("../data/hkm-data/matin.json");
const momentMidi = require("../data/hkm-data/midi.json");
const momentApresMidi = require("../data/hkm-data/apresmidi.json");
const momentSoir = require("../data/hkm-data/soir.json");
const momentSoirCouche = require("../data/hkm-data/soircouche.json");
const actions = require("../data/hkm-data/tidy/actions.json");

const UserId = 1;

async function seedApp() {
	try {
		console.log("Setting up...");
		await importSeedData();
		console.log("Ready to go");
	} catch (error) {
		console.log("Could not import seed data");
		console.error(error);
	}
}

async function createEntry({ model, entry }) {
	try {
		await strapi.documents(`api::${model}.${model}`).create({
			data: entry,
			status: "published",
		});
	} catch (error) {
		console.error({ model, entry, error });
	}
}

async function queryEntry({ model, filters }) {
	try {
		return strapi.documents(`api::${model}.${model}`).findFirst({
			filters: filters,
		});
	} catch (error) {
		console.error({ model, filters, error });
	}
}

async function queryImg(fileName) {
	try {
		return strapi.query("plugin::upload.file").findOne({
			filters: {
				name: {
					$eq: fileName,
				},
			},
		});
	} catch (error) {
		console.error({ fileName, error });
	}
}

async function importTaskAndMoment(moment) {
	const listOfTaskToAssignToMoment = [];
	for (const task of moment.tasks) {
		const listOfActionToAssignToTask = [];
		for (const action of task.actions) {
			const actionReturned = await queryEntry({
				model: "action",
				filters: {
					title: {
						$eq: action.title,
					},
				},
			});
			listOfActionToAssignToTask.push(actionReturned.id);
		}
		const imgTaskResult = await queryImg(task.img.fileName);
		console.log(
			"🚀 ~ importTaskAndMoment ~ task.img.fileName:",
			task.img.fileName,
			"result: ",
			imgTaskResult?.id,
		);
		const taskAlreadyExist = await queryEntry({
			model: "task",
			filters: {
				title: {
					$eq: task.title,
				},
			},
		});
		let taskAcc = taskAlreadyExist;
		if (!taskAlreadyExist) {
			await createEntry({
				model: "task",
				entry: {
					title: task.title,
					img: imgTaskResult.id,
					actions: listOfActionToAssignToTask,
					users_permissions_user: UserId,
				},
			});
			taskAcc = await queryEntry({
				model: "task",
				filters: {
					title: {
						$eq: task.title,
					},
				},
			});
		}
		listOfTaskToAssignToMoment.push(taskAcc.id);
	}
	const imgMomentResult = await queryImg(moment.img.fileName);
	const momentAlreadyExist = await queryEntry({
		model: "moment",
		filters: {
			label: {
				$eq: moment.title,
			},
		},
	});
	if (!momentAlreadyExist) {
		await createEntry({
			model: "moment",
			entry: {
				label: moment.label,
				timeStart: moment.timeStart,
				timeEnd: moment.timeEnd,
				img: imgMomentResult.id,
				tasks: listOfTaskToAssignToMoment,
				users_permissions_user: UserId,
			},
		});
	}
}

async function importActions(actions) {
	for (const action of actions) {
		await createEntry({
			model: "action",
			entry: {
				title: action.title,
				users_permissions_user: UserId,
			},
		});
		console.log(`Action created: ${action.title}`);
	}
}

async function importSeedData() {
	// Create all entries
	await importActions(actions);

	await importTaskAndMoment(momentMatin);
	await importTaskAndMoment(momentMidi);
	await importTaskAndMoment(momentApresMidi);
	await importTaskAndMoment(momentSoir);
	await importTaskAndMoment(momentSoirCouche);
}

async function main() {
	const { createStrapi, compileStrapi } = require("@strapi/strapi");

	const appContext = await compileStrapi();
	const app = await createStrapi(appContext).load();

	app.log.level = "error";

	await seedApp();
	await app.destroy();

	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
