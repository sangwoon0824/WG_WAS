//require 모음
const express = require("express");
const app = express();
const router = express.Router();
//const helmet = require("helmet");
const limit = require("express-rate-limit");
const fs = require("fs");
const Caver = require("caver-js");
const CONTRACT = require("./build/wgContract.json");
const SPECIALLIST = require("./build/special.json");
const { pkey, addr } = require("./dataset/secret.js");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

const networkID = "8217";
const contract = new caver.klay.Contract(CONTRACT.abi, CONTRACT.address);
/*
//basic node security
const cspOptions = {
  directives: {
    // 기본 옵션을 가져옵니다.
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),

    "script-src": [
      "'self'",
      "*.googleapis.com",
      "https://hangeul.pstatic.net",
      "https://cdn.jsdelivr.net",
    ],
  },
};


// Helmet의 모든 기능 사용. (contentSecurityPolicy에는 custom option 적용)
app.use(
  helmet({
    contentSecurityPolicy: cspOptions,
  })
);
*/
//hide backend engine
app.disable("x-powered-by");

//ddos simple protaction
app.use(
  limit({
    windowMs: 1 * 60 * 1000,
    max: 5000,
  })
);

//테스트 서버 포트
const port = process.env.PORT || 8080;

//동적 폴더(CSS,JS 로딩 용이)
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/metadata/:id", (req, res) => {
  let id = req.params.id;
  if (id > 0) {
    res.send(
      "<script>alert('발행되지않은 토큰입니다');</script>\n" +
        "<div>non-existent token ID</div>"
    );
  } else {
    res.sendFile(__dirname + "/json/" + id + ".json");
  }
});

app.get("/", (req, res) => {
  res.render("index.html");
});
/*
app.get("/mintwg20220410", (req, res) => {
  res.render("mint.html");
});
*/

app.get("/wgtestmint20220410", (req, res) => {
  res.render("mint.html");
});

app.get("/not-support-this-browser", (req, res) => {
  res.sendFile(__dirname + "/public/not-support-this-browser.html");
});
/*
app.post("/checkwhitelist", (req, res) => {
  var data = req.body.data;
  result = isWhiteList(String(data));
  res.send({ result: result });
});
*/

app.post("/checkspecial", async (req, res) => {
  var address = req.body.data;

  for (i = 0; i <= SPECIALLIST.length; i++) {
    if (SPECIALLIST["#" + (i + 1)] == address) {
      console.log(SPECIALLIST["#" + (i + 1)]);
    }
  }
});

app.post("/getContract", (req, res) => {
  res.send({ postAbi: CONTRACT.abi, postContract: CONTRACT.address });
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
/*
async function isWhiteList(_inputAddress) {
  let article = fs.readFileSync(__dirname + "/dataset/whitelist.txt");
  let wlDB = String(article).split("\n");

  for (i = 0; i <= wlDB.length; i++) {
    let data = wlDB[i];
    let dataST = String(data).substr(0, 42);
    if (String(dataST).toUpperCase() == _inputAddress.toUpperCase()) {
      boolWL = true;
    }
  }
  return boolWL;
}

async function isSpecial(_inputAddress) {
  let boolSP = false;
  let article = fs.readFileSync(__dirname + "/dataset/special.txt");
  let spDB = String(article).split("\n");

  for (i = 0; i <= spDB.length; i++) {
    let data = spDB[i];
    let dataST = String(data).substr(0, 42);
    console.log(String(dataST).toUpperCase() == _inputAddress.toUpperCase());
    if (String(dataST).toUpperCase() == _inputAddress.toUpperCase()) {
      boolSP == true;
      return boolSP;
    }
  }
  boolSP == false;
  return boolSP;
}
*/
