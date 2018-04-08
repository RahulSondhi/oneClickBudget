let stitchClient;
let stitchClientt;
let appId = 'oneclickbudget-xueak';
let appIdd= 'useroneclickbudget-vksnm'
function pullCase(d) {
	d.find({}).execute().then(docs => {
		console.log(docs)
		console.log("Done")
	})
}
function userPull(d) {
	d.find({}).execute().then(docs => {
		console.log(docs)
		console.log("Done")
	})
}
function editUserStats(d,spouse,job,children,house,balance,assests, expenses,transaction,day)
 {
	d.updateOne(
		{"status":spouse,
		"employment": job,
		"dependants": children,
		"housing":house,
		"balance": balance,
		"assests": assests,
		"expenses": expenses,
		"transaction": transaction,
		"day": day
	}
	)
}
function addUser(d,spouse,job,children,house,balance, assests, expenses, transaction, day)
 {
	d.insertOne(
		{"status":spouse,
		"employment": job,
		"dependants": children,
		"housing":house,
		"balance": balance,
		"assests": assests,
		"expenses": expenses,
		"transaction": [],
		"day": 0
	}
	)
}
function clearDebug(d) {
	d.deleteMany({})
}
function initApplication() {
	return stitch.StitchClientFactory.create(appId).then(client => {
		stitchClient = client;
	}).then(() => {
		const db = stitchClient.service('mongodb', 'mongodb-atlas').db('oneBudget');
		const coll = db.collection('MongoDB');
		stitchClient.login().then(() =>
			coll.updateOne({owner_id: stitchClient.authedId()}, {$set:{number:42}}, {upsert:true})
		).then(()=>
			coll.find({owner_id: stitchClient.authedId()}).limit(100).execute()
		).then(docs => {
			console.log("Found docs", docs)
			console.log("[MongoDB Stitch]Connected to Case App")
			pullCase(coll)
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
		stitchClientt.login().then(() =>
			colll.updateOne({owner_id: stitchClientt.authedId()}, {$set:{number:42}}, {upsert:true})
		).then(()=>
			colll.find({owner_id: stitchClientt.authedId()}).limit(100).execute()
		).then(docs => {
			console.log("Found docs", docs)
			console.log("[MongoDB Stitch]Connected to User App")
			clearDebug(colll)
			addUser(colll, "Single", "Employed", "none", "none", 100, [{name: "Job", gain: 440.00, frequency: 14}], [{name: "Food", loss: 8.00, frequency: 1},{name: "Gas", loss: 30.00, frequency: 7},{name: "Personal Care", loss: 14.86, frequency: 7}], [],0)
			userPull(colll)
		}).catch(err => {
			console.error(err)
		});
	});
}
