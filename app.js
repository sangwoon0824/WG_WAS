//require 모음
const express = require("express");
const app = express();
const router = express.Router();
//const helmet = require("helmet");
const limit = require("express-rate-limit");
const fs = require("fs");
const Caver = require("caver-js");
const V1_CONTRACT = require("./build/v1_contract.json");
const STORY_CONTRACT = require("./build/story_contract.json");
const { pkey, addr } = require("./dataset/secret.js");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";
//const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

const networkID = "1001";
//const networkID = "8217";
const v1_contract = new caver.klay.Contract(
  V1_CONTRACT.abi,
  V1_CONTRACT.address
);

const story_contract = new caver.klay.Contract(
  STORY_CONTRACT.abi,
  STORY_CONTRACT.address
);

//hide backend engine
app.disable("x-powered-by");

//ddos simple protaction
app.use(
  limit({
    windowMs: 1 * 60 * 1000,
    max: 10000,
  })
);

const port = process.env.PORT || 8080;

//동적 폴더(CSS,JS 로딩 용이)
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/meatadata/:id", async (req, res) => {
  let maxTokenId = await checkV1TokenId();
  let id = req.params.id;
  if (id > parseInt(maxTokenId) + 1) {
    res.send(
      "<script>alert('발행되지않은 토큰입니다');</script>\n" +
        "<div>non-existent token ID</div>"
    );
  } else {
    res.sendFile(__dirname + "/json/v1_json/" + id + ".json");
  }
});

app.get("/storycard/:id", async (req, res) => {
  let maxTokenId = await checkStoryTokenId();
  let id = req.params.id;
  if (id > parseInt(maxTokenId)) {
    res.send(
      "<script>alert('발행되지않은 토큰입니다');</script>\n" +
        "<div>non-existent token ID</div>"
    );
  } else {
    res.sendFile(__dirname + "/json/story_json/" + id + ".json");
  }
});

app.get("/", (req, res) => {
  userCountMain++;
  res.render("index.html");
});
/*
app.get("/testwgmint", (req, res) => {
  res.render("WG_MINT.html");
});
*/
app.get("/storyairdrop", async (req, res) => {
  res.render("WG_STORY.html");
});

app.get("/not-support-this-browser", (req, res) => {
  res.sendFile(__dirname + "/public/not-support-this-browser.html");
});

app.post("/getV1Contract", (req, res) => {
  res.send({ postAbi: V1_CONTRACT.abi, postContract: V1_CONTRACT.address });
});

app.post("/getStoryContract", (req, res) => {
  res.send({
    postAbi: STORY_CONTRACT.abi,
    postContract: STORY_CONTRACT.address,
  });
});

//라우터에서 설정되어 있지 않은 주소로 접속하
app.all("*", (req, res) => {
  res.send(
    "<script>alert('존재하지 않는 주소입니다.'); window.location = 'http://' + window.location.hostname;</script>"
  );
  //res.status(404).send("PAGE NOT FOUND")
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("The Test server is listening on " + port);
});

//-------------------------------------------------------------------//
//----------------------Function part--------------------------------//
//-------------------------------------------------------------------//

async function checkV1TokenId() {
  var data;
  await v1_contract.methods
    .totalSupply()
    .call()
    .then(async function (result) {
      data = result;
    })
    .catch(function (error) {
      console.log("조회 실패");
      console.log(error);
    });
  return data;
}
async function checkStoryTokenId() {
  var data;
  await STORY_CONTRACT.methods
    .totalSupply()
    .call()
    .then(async function (result) {
      data = result;
    })
    .catch(function (error) {
      console.log("조회 실패");
      console.log(error);
    });
  return data;
}
