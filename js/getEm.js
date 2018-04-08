let caseStitchClient;
let userStitchClient;
let caseAppId = 'oneclickbudget-xueak';
let userAppId = 'useroneclickbudget-vksnm';
let cases = null;
let user = null;

$(function() {
	initApplication();
})

function pullCase(d) {
	d.find({}).execute().then(docs => {
		cases = docs;
		console.log(cases);
		console.log("Done");
	})
}
function userPull(d) {
	d.find({}).execute().then(docs => {
		user = docs;
		console.log(user);
		console.log("Done");
		setupAccount();
	});
}

function getUserThings(acctInfo){
	return user;
}
function getCaseThings(caseInfo){
	return cases;
}

function editUserStats(d,spouse,job,children,house,balance,assets,expenses,transaction,day) {
	d.updateOne(
		{"status": spouse,
		"employment": job,
		"dependants": children,
		"housing": house,
		"balance": balance,
		"assets": assets,
		"expenses": expenses,
		"transaction": transaction,
		"day": day
	}
	)
}
function addUser(d,spouse,job,children,house,balance,assets,expenses,transaction,day) {
	d.insertOne(
		{"status": spouse,
		"employment": job,
		"dependants": children,
		"housing": house,
		"balance": balance,
		"assets": assets,
		"expenses": expenses,
		"transaction": [],
		"day": 0
	}
	)
}
function clearDebug(d) {
	d.deleteMany({});
	addUser(d, "Single", "Employed", "none", "none", 250.00, [{
			name: "Job",
			gain: 440.00,
			frequency: 14
		}], [{
			name: "Food",
			loss: 8.00,
			frequency: 1
		}, {
			name: "Gas",
			loss: 30.00,
			frequency: 7
		}, {
			name: "Personal Care",
			loss: 14.86,
			frequency: 7
		}], [], 0);
}

function initApplication() {
	return stitch.StitchClientFactory.create(caseAppId).then(client => {
		caseStitchClient = client;
	}).then(() => {
		const db = caseStitchClient.service('mongodb', 'mongodb-atlas').db('oneBudget');
		const coll = db.collection('MongoDB');
		caseStitchClient.login().then(docs => {
			console.log("Found docs", docs);
			console.log("[MongoDB Stitch]Connected to Case App");
			pullCase(coll);
			initUserApplication();
		}).catch(err => {
			console.error(err);
		});
	});
}
function initUserApplication() {
	return stitch.StitchClientFactory.create(userAppId).then(client => {
		userStitchClient = client;
	}).then(() => {
		const dbb = userStitchClient.service('mongodb', 'mongodb-atlas').db('userOneBudget');
		const colll = dbb.collection('user');
		userStitchClient.login().then(docs => {
			console.log("Found docs", docs);
			console.log("[MongoDB Stitch]Connected to User App");
			clearDebug(colll);
      userPull(colll);
		}).catch(err => {
			console.error(err);
		});
	});
}
