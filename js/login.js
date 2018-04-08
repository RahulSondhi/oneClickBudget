let loginStitchClient;
let userAppId = 'useroneclickbudget-vksnm';

function startLogin() {
  return stitch.StitchClientFactory.create(userAppId).then(client => {
    loginStitchClient = client;
  }).then(() => {
    const col = loginStitchClient.service('mongodb', 'mongodb-atlas')
      .db('userLogin').collection('loginInfo');
    loginStitchClient.login().then(docs => {

    }).catch(err => {
      console.err(err);
    })
  })
}
