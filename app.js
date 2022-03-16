//require 모음
const express = require("express");
const { append } = require("express/lib/response");
const app = express();
const router = express.Router();
//const helmet = require("helmet");
const limit = require("express-rate-limit");
const ejs = require("ejs");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

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
    max: 1000,
  })
);

//포트 설정
const port = process.env.PORT || 8080;

//테스트 서버 포트
//const port = process.env.PORT || 800;

//동적 폴더(CSS,JS 로딩 용이)
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/not-support-this-browser", (req, res) => {
  res.sendFile(__dirname + "/public/not-support-this-browser.html");
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
