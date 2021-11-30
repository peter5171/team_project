const result = fetch("/")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    return myJson;
  });
console.log(result);

let model;
const data = [
  [30.9, 0, 4828],
  [29.5, 7.5, 4812],
  [31.3, 0, 4812],
  [31.7, 0, 4812],
  [32.6, 0, 4778],
  [33.6, 0, 4778],
  [33.7, 0, 4778],
  [33.1, 0, 4778],
  [31.1, 0, 4737],
  [30, 2, 4737],
  [30.5, 6.5, 4737],
  [30.5, 0, 4737],
  [31, 0, 4737],
  [28.8, 2, 4737],
  [30.7, 0, 4737],
  [31, 0, 4701],
  [30.6, 5, 4434],
  [30.5, 1, 4434],
  [31.7, 0, 4401],
  [31.7, 1, 4363],
  [29.9, 0, 4363],
  [27.2, 0, 4471],
  [26.7, 0, 4471],
  [28.2, 0, 4471],
  [29.1, 0, 4471],
  [26.6, 5, 4247],
  [30.7, 0, 4247],
  [29.4, 3, 4247],
  [24.4, 7.5, 4247],
  [25.2, 0, 4247],
];

(async () => {
  model = await dfd.tf.loadGraphModel("http://localhost:3000/model/model.json");
  let scaler = new dfd.MinMaxScaler();
  let df = new dfd.DataFrame(data);
  //df.print();
  scaler.fit(df);
  let df_enc = scaler.transform(df);
  //df_enc.print();

  const tensorData = df_enc.tensor.reshape([-1, 30, 3]);
  tensorData.print();
  //tensorData.print();
  const predict = await model.executeAsync(tensorData);

  const predArray = await predict.array();
  console.log(predArray[0].map((v) => [0, 0, v]));
  let df_inv = scaler.inverse_transform(predArray[0].map((v) => [0, 0, v]));
  df_inv.print();
  console.log(df_inv.getColumnData[2]);
})();
