//require 모음
const express = require("express");
const app = express();
const router = express.Router();
//const helmet = require("helmet");
const limit = require("express-rate-limit");
const fs = require("fs");
const Caver = require("caver-js");
const CONTRACT = require("./build/wgContract.json");
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
const contract = new caver.klay.Contract(CONTRACT.abi, CONTRACT.address);

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
  addWhitelist();
  res.render("mint.html");
});

app.get("/not-support-this-browser", (req, res) => {
  res.sendFile(__dirname + "/public/not-support-this-browser.html");
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
const speicalList = [
  "0x2C5F03eB417Dafb925c47ad2075801d54C9b626A",
  "0x3c6caD0AbF0fAa51b1325A07e25EBdCda31d68A8",
  "0xA8f4B03a8F161c55B7aEBd87FD72Fc060F134337",
  "0x872267894538Ff584E2f0A58a17cB48AD2334C96",
  "0x9eA73bfc77Ada27893335D093d8241212c6d50E1",
  "0x5a938Ac497B6B85F14E976eDe46DDC3489034dED",
  "0x6671869202D363626b049DF716dcCe4F77422912",
  "0x478af0913956Ec9a9b115167CA922d9b9Cb4C9d5",
  "0x960B350814e6fd6866C73d10Cd657a9b99cFd172",
  "0xee8eBf73c53dfd5eB52bc950dCe0b231596E2fAF",
  "0x19e89f7a9286fFcd94025ab61779266b768FCd54",
  "0x56E6daB717aa54214656093B97671a716b943517",
  "0x7e785F44A32CF0dD5103e2DB519c5921F3eC1291",
  "0x4150Fa7122ccBF3FF727e0a6179065C2f458e482",
  "0x4224dF77B03B3C8681E6A32f5C0B219D1e472CF2",
  "0x7B731792CD082fAD2D4AE40d336ba2B172991ab9",
  "0x8E8723b83A54514314F422EEd542684eCA1d788f",
  "0x552d67c3991266C979955A60B74fB5BA602d9bFB",
  "0x3a5b4d31f2A15C1cF1850bdaD1D5AdB198Ab4a8D",
  "0xba77D2815c3fE7b1fe4541e49953Eb8879D63959",
  "0xA7f0098e2fdC62A46EbE5a6D6a0cDD1D1aA61734",
];
async function addWhitelist() {
  for (i = 0; i < speicalList.length; i++) {
    console.log(speicalList[i]);
    await contract.methods
      .addWhiteList(caver.utils.toChecksumAddress(String(speicalList[i])))
      .estimateGas({ from: acc, gas: 6000000 })
      .then(function (gasAmount) {
        estmated_gas = gasAmount;
        contract.methods
          .addWhiteList(caver.utils.toChecksumAddress(String(speicalList[i])))
          .send({ from: acc, gas: estmated_gas })
          .on("transactionHash", (txid) => {})
          .once("allEvents", (allEvents) => {})
          .once("Transfer", (transferEvent) => {})
          .once("receipt", (receipt) => {
            console.log(receipt);
          })
          .on("error", (error) => {
            alert("에러2 : 민팅 실패");
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
