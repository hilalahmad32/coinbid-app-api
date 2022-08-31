// get videos  comment code
// let limitrecords = 5;

// function getRandomArbitrary() {
//   return Math.ceil(Math.random() * total_count);
// }
// var skipRecords = getRandomArbitrary();
// const video_ads = await VideoAds.find({}).sort({ "_id": -1 }).skip(
//   total_count,
// ).limit(-7);
var random = Math.floor(Math.random() * total_count);
// const video_ads = await VideoAds.find({}).sort({ "_id": -1 })
//   .limit(5).skip(random);
// const total_ads = await VideoAds.find({}).sort({ "_id": -1 })
//   .limit(5).skip(random).count();

// const total_ads = await VideoAds.aggregate([{
//   $sample: { size: 1 },
// }]).count();

// anther ads

// console.log(video_id);
// if (_id) {
//   const ads = await Ads.findById({ _id });
//   const wallet = await UserWallet.findOne({ users });
//   wallet.coins += parseInt(ads.coins);
//   await wallet.save();
//   const report = await Report.find({ users: users }).count();
//   const updateReport = await Report.findOne({ users: users });
//   if (report == 1) {
//     updateReport.ads_watch += 1;
//     updateReport.coin_earned = parseInt(wallet.coins);
//     updateReport.today_coin_earned += parseInt(ads.coins);
//     await updateReport.save();
//   } else {
//     const new_report = new Report({
//       users,
//       updateReport: 1,
//     });
//     await new_report.save();
//   }
//   return res.send({
//     success: true,
//     "message": "Ads watcheds",
//   });
// } else {

// const totalData = Math.ceil(orders / users);
// const showCoins = coins.slice(0, totalData);
// console.log(showCoins);
// const users = req.user_id;
// const count = await Coin.find({ users }).count();
// var random = Math.floor(Math.random() * count);
// const coins = await Coin.find({ users }).skip(random).limit(
//   50,
// );
// const users = await User.find({}).count();
// const orders = await Order.find({}).count();
console.log(new Date(new Date().getTime() - (24 * 60 * 60 * 10000)));
