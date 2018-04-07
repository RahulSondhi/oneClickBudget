let stitchClient;
let appId = 'oneclickbudget-xueak';

function initApplication() {
	return stitch.StitchClientFactory.create(appId).then(client => {
		stitchClient = client;
	}).then(() => {
		const db = stitchClient.service('mongodb', 'mongodb-atlas').db('oneBudget');
		stitchClient.login().then(() =>
			db.collection('MongoDB').updateOne({owner_id: stitchClient.authedId()}, {$set:{number:42}}, {upsert:true})
		).then(()=>
			db.collection('MongoDB').find({owner_id: stitchClient.authedId()}).limit(100).execute()
		).then(docs => {
			console.log("Found docs", docs)
			console.log("[MongoDB Stitch]Connected to Stitch")
			let d = db.collection("MongoDB").find()
			console.log(d)
		}).catch(err => {
			console.error(err)
		});
	});
}