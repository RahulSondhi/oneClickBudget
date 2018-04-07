let stitchClient;
let appId = 'oneclickbudget-xueak';
function pullCase(d) {
 d.count().then(count => {
console.log(count)
 })
}
function get(d) {
	d.find({}).execute().then(docs => {
		console.log(docs)
	})
}
function addCase(d) {
	d.insertMany([{
		spouse: '11111'
	}, {spouse: '11110'}])
}
function editUserStats(d) {
	d.updateOne(
		{"spouse":'True'}
	)
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
			console.log("[MongoDB Stitch]Connected to Stitch")
			addCase(coll)
			editUserStats(coll)
			get(coll)
			//pullCase(coll)
		}).catch(err => {
			console.error(err)
		});
	});
}
