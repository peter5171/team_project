import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { week_api, weather_api, good_api } from "../api.js";

var router = express.Router();
require("dotenv").config({ path: "../.env" });
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res) => {
  const { cmpName, goodName, midName } = req.params;

  // 일주일의 기온과 강수량 API 데이터를 받아온다.
  const week = week_api(
    "http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList",
    `=${process.env.WEEK_WEATHER_KEY}`,
    10
  );

  // 단기 예보 api
  const weather = weather_api(
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
    `=${process.env.WHEATHER_KEY}`,
    50
  );

  // 농산물 시세
  const conditions = good_api(
    "http://apis.data.go.kr/6260000/ByMarketCostTrend/getByMarketCostTrendinfo",
    `=${process.env.GOOD_PRICE_KEY}`,
    10,
    "부산중앙청과",
    "밤고구마",
    "고구마"
  );

  const api_respon = {
    week: week,
    weather: weather,
    contions: conditions,
  };

  res.json(api_respon);
});

export default router;
