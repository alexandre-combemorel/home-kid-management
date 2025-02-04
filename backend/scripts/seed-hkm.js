const momentMatin = require("../data/hkm-data/matin.json");
const momentMidi = require("../data/hkm-data/midi.json");
const momentApresMidi = require("../data/hkm-data/apresmidi.json");
const momentSoir = require("../data/hkm-data/soir.json");
const momentSoirCouche = require("../data/hkm-data/soircouche.json");
const actions = require("../data/hkm-data/tidy/actions.json");

const UserId = 1;

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seedStagingApp() {
	try {
		console.log("Setting up the template...");
		await importSeedData();
		console.log("Ready to go");
	} catch (error) {
		console.log("Could not import seed data");
		console.error(error);
	}
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
	try {
		// Actually create the entry in Strapi
		// await sleep(100);
		await strapi.documents(`api::${model}.${model}`).create({
			data: entry,
			status: "published",
		});
	} catch (error) {
		console.error({ model, entry, error });
	}
}

async function importAll(moment) {
	for (const task of moment.tasks) {
		for (const actionsMatin of task.actions) {
			await createEntry({
				model: "action",
				entry: {
					id: actionsMatin.id,
					title: actionsMatin.title,
					users_permissions_user: UserId,
				},
			});
		}
		await createEntry({
			model: "task",
			entry: {
				id: task.id,
				title: task.title,
				img: task.img.id,
				actions: task.actions.map((a) => a.id),
				users_permissions_user: UserId,
			},
		});
	}
	await createEntry({
		model: "moment",
		entry: {
			id: moment.id,
			label: moment.label,
			timeStart: moment.timeStart,
			timeEnd: moment.timeEnd,
			img: moment.img.id,
			tasks: moment.tasks.map((t) => t.id),
			users_permissions_user: UserId,
		},
	});
}

async function importSeedData() {
	// Create all entries
	// await importAll(momentMatin);
	// await importAll(momentMidi);
	// await importAll(momentApresMidi);
	// await importAll(momentSoir);
	// await importAll(momentSoirCouche);
	await createEntry({
		model: "action",
		entry: {
			id: actions[0].id,
			title: actions[0].title,
			users_permissions_user: UserId,
		},
	});
}

async function main() {
	const { createStrapi, compileStrapi } = require("@strapi/strapi");

	const appContext = await compileStrapi();
	const app = await createStrapi(appContext).load();

	app.log.level = "error";

	await seedStagingApp();
	await app.destroy();

	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
