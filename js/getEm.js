let stitchClient;
let stitchClientt;
let appId = 'oneclickbudget-xueak';
let appIdd= 'useroneclickbudget-vksnm';
var caser = null;
var user = null;

$(function() {
	initApplication();
})

function pullCase(d) {
	d.find({}).execute().then(docs => {
		caser = docs
		console.log(caser)
		console.log("Done")
	})
}
function userPull(d) {
	d.find({}).execute().then(docs => {
		user = docs
		console.log(user)
		console.log("Done")
	})
	d.find({}).execute().then(docs => {
		d.find({}).execute().then(docs => {
			d.find({}).execute().then(docs => {
				d.find({}).execute().then(doc => {
					d.find({}).execute().then(doc => {
				setTimeout(function () {setupAccount();}, 10000);
					})
				})
			})
		})
	})
}

function getUserThings(acctInfo){
	acctInfo = user;
	return acctInfo
}

function getCaseThings(caseInfo){
	caseInfo = caser;
	return caseInfo;
}

function editUserStats(d,spouse,job,children,house,balance,assets, expenses,transaction,day)
 {
	d.updateOne(
		{"status":spouse,
		"employment": job,
		"dependants": children,
		"housing":house,
		"balance": balance,
		"assets": assets,
		"expenses": expenses,
		"transaction": transaction,
		"day": day
	}
	)
}
function addUser(d,spouse,job,children,house,balance, assets, expenses, transaction, day)
 {
	d.insertOne(
		{"status":spouse,
		"employment": job,
		"dependants": children,
		"housing":house,
		"balance": balance,
		"assets": assets,
		"expenses": expenses,
		"transaction": [],
		"day": 0
	}
	)
}
function clearDebug(d) {
	d.deleteMany({})
	editUserStats(d, "Single", "Employed", "none", "none", 100.00, [{name: "Job", gain: 440.00, frequency: 14}], [{name: "Food", loss: 8.00, frequency: 1},{name: "Gas", loss: 30.00, frequency: 7},{name: "Personal Care", loss: 14.86, frequency: 7}], [],0)
}
function initApplication() {
	return stitch.StitchClientFactory.create(appId).then(client => {
		stitchClient = client;
	}).then(() => {
		const db = stitchClient.service('mongodb', 'mongodb-atlas').db('oneBudget');
		const coll = db.collection('MongoDB');
		stitchClient.login().then(docs => {
			console.log("Found docs", docs)
			console.log("[MongoDB Stitch]Connected to Case App")
			pullCase(coll)
			initUserApplication()
		}).catch(err => {
			console.error(err)
		});
	});
}
function initUserApplication() {
	return stitch.StitchClientFactory.create(appIdd).then(client => {
		stitchClientt = client;
	}).then(() => {
		const dbb = stitchClientt.service('mongodb', 'mongodb-atlas').db('userOneBudget');
		const colll = dbb.collection('user');
		stitchClientt.login().then(docs => {
			console.log("Found docs", docs)
			console.log("[MongoDB Stitch]Connected to User App")
			clearDebug(colll)
      userPull(colll)
			}).catch(err => {
			console.error(err)
		});
	});
}
