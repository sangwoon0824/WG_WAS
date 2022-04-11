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

////const rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";
const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const caver = new Caver(rpcURL);

const temp = caver.klay.accounts.createWithAccountKey(addr, pkey);
caver.klay.accounts.wallet.add(temp);
const acc = caver.klay.accounts.wallet.getAccount(0);

//const networkID = "1001";
const networkID = "8217";
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

app.get("/wgtestmint20220411", (req, res) => {
  res.render("mint.html");
});

app.get("/not-support-this-browser", (req, res) => {
  res.sendFile(__dirname + "/public/not-support-this-browser.html");
});
app.get("/addwl", async (req, res) => {
  await addWhitelist();
  res.send("<script>alert('화리 추가 완료');</script>");
});
app.get("/addsp", async (req, res) => {
  await addSpecial();
  res.send("<script>alert('스페셜 추가 완료');</script>");
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
const speicalList = ["0xba77D2815c3fE7b1fe4541e49953Eb8879D63959"];
const whitelistJSON = ["0xba77D2815c3fE7b1fe4541e49953Eb8879D63959"];
async function addWhitelist() {
  for (i = 0; i < whitelistJSON.length; i++) {
    test = await caver.utils.toChecksumAddress(whitelistJSON[i]);
    setTimeout(async () => {
      await contract.methods
        .addWhiteList(test)
        .estimateGas({
          from: caver.utils.toChecksumAddress(addr),
          gas: 99999999999999,
        })
        .then(async function (gasAmount) {
          estmated_gas = gasAmount;
          await contract.methods
            .addWhiteList(test)
            .send({
              from: caver.utils.toChecksumAddress(addr),
              gas: estmated_gas,
            })
            .on("transactionHash", (txid) => {})
            .once("allEvents", (allEvents) => {})
            .once("Transfer", (transferEvent) => {})
            .once("receipt", (receipt) => {
              console.log(receipt);
            })
            .on("error", (error) => {
              console.log("에러2 : 트젝 실패");
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log("에러1 : 가스 계측 실패");
          console.log(error);
        });
    }, 100);
  }
}

async function addSpecial() {
  for (i = 0; i < speicalList.length; i++) {
    test = caver.utils.toChecksumAddress(speicalList[i]);
    await contract.methods
      .addSpecialList(test)
      .estimateGas({ from: caver.utils.toChecksumAddress(addr), gas: 6000000 })
      .then(async function (gasAmount) {
        estmated_gas = gasAmount;
        await contract.methods
          .addSpecialList(test)
          .send({
            from: caver.utils.toChecksumAddress(addr),
            gas: estmated_gas,
          })
          .on("transactionHash", (txid) => {})
          .once("allEvents", (allEvents) => {})
          .once("Transfer", (transferEvent) => {})
          .once("receipt", (receipt) => {
            console.log(receipt);
          })
          .on("error", (error) => {
            console.log("에러2 : 트젝 실패");
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log("에러1 : 가스 계측 실패");
        console.log(error);
      });
  }
}
