import axios from "axios";

export const week_api = async (api_url, key, numOfRows) => {
  //어제의 날짜
  const dateYesterday = new Date(Date.now() - 3600 * 24 * 1000);
  const dateStringYesterday =
    "" +
    dateYesterday.getFullYear() +
    ("0" + (dateYesterday.getMonth() + 1)).slice(-2) +
    ("0" + dateYesterday.getDate()).slice(-2);

  //6일전의 날짜
  const date6dayBefore = new Date(Date.now() - 3600 * 24 * 6 * 1000);
  const dataString6dayBefore =
    "" +
    date6dayBefore.getFullYear() +
    ("0" + (date6dayBefore.getMonth() + 1)).slice(-2) +
    ("0" + date6dayBefore.getDate()).slice(-2);

  const url = api_url; /*URL*/
  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + key; /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
  queryParams +=
    "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON");
  queryParams +=
    "&" + encodeURIComponent("dataCd") + "=" + encodeURIComponent("ASOS");
  queryParams +=
    "&" + encodeURIComponent("dateCd") + "=" + encodeURIComponent("DAY");
  queryParams +=
    "&" +
    encodeURIComponent("startDt") +
    "=" +
    encodeURIComponent(dataString6dayBefore);
  queryParams +=
    "&" +
    encodeURIComponent("endDt") +
    "=" +
    encodeURIComponent(dateStringYesterday);
  queryParams +=
    "&" + encodeURIComponent("stnIds") + "=" + encodeURIComponent("108");
  const {
    data: {
      response: {
        body: {
          items: { item: weekWeather_item },
        },
      },
    },
  } = await axios.get(url + queryParams);
  console.log(weekWeather_item);

  const converted = weekWeather_item.map((v) => ({
    date: v.tm, //날짜
    avgTemp: parseFloat(v.avgTa), //평균 기온
    sumRain: v.sumRn === "" ? 0 : parseFloat(v.sumRn), //평균 강수량
  }));
  console.log(converted);
  return converted;
};

export const weather_api = async (api_url, key, numOfRows) => {
  //오늘의 날짜
  const dateToDay = new Date();
  const dateStringToDay =
    "" +
    dateToDay.getFullYear() +
    ("0" + (dateToDay.getMonth() + 1)).slice(-2) +
    ("0" + dateToDay.getDate()).slice(-2);

  const tem_url = api_url; /*URL*/
  let tem_queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + key; /*Service Key*/
  tem_queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  tem_queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent(numOfRows); /**/
  tem_queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  tem_queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(dateStringToDay); /**/
  tem_queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("0500"); /**/
  tem_queryParams +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /**/
  tem_queryParams +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/
  const {
    data: {
      response: {
        body: {
          items: { item: temp_item },
        },
      },
    },
  } = await axios.get(tem_url + tem_queryParams);

  console.log(temp_item);

  const weather = temp_item.map((v) => ({
    baseDate: v.baseDate, //날짜
    category: v.category, // 카테고리(기온, 강수량)
    obsrValue: v.obsrValue === "" ? 0 : parseFloat(v.obsrValue), //값
  }));
  console.log(weather);
  return weather;
};

export const good_api = async (
  api_url,
  key,
  numOfRows,
  cmpName,
  goodName,
  midName
) => {
  const dateToDay2 = new Date();
  const dateStringToDay2 =
    "" +
    dateToDay2.getFullYear() +
    "-" +
    ("0" + (dateToDay2.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateToDay2.getDate()).slice(-2);
  console.log(dateStringToDay2);

  const conditions_url = api_url; /*URL*/
  let conditions_queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + key; /*Service Key*/
  conditions_queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent(numOfRows); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("cmpName") +
    "=" +
    encodeURIComponent(cmpName); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("goodName") +
    "=" +
    encodeURIComponent(goodName); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("midName") +
    "=" +
    encodeURIComponent(midName); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("saleDate") +
    "=" +
    encodeURIComponent(dateStringToDay2); /**/
  conditions_queryParams +=
    "&" +
    encodeURIComponent("resultType") +
    "=" +
    encodeURIComponent("json"); /**/
  const {
    data: {
      getByMarketCostTrendinfo: { item: conditions_items },
    },
  } = await axios.get(conditions_url + conditions_queryParams);
  console.log(conditions_items);
  const conditions = conditions_items.map((v) => ({
    cost: parseFloat(v.aveCost), //평균 가격
    saleDate: v.saleDate, //판매 날짜
    name: v.midName, // 작물 이름
  }));
  console.log(conditions);

  return conditions;
};
