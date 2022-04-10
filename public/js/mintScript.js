let account;
let mintIndexForSale = 0;
let maxSaleAmount = 0;
let mintPrice = 0;
let mintStartBlockNumber = 0;
let mintLimitPerBlock = 0;
let mintLimitPerSale = 0;
let round = 4;

let blockNumber = 0;
let blockCnt = false;
let accountConnect = false;

document.addEventListener("DOMContentLoaded", async function (event) {
  document.getElementById("address").innerHTML =
    "<p>Contract Address</p>\n" + `<p>${CONTRACTADDRESS}</p>`;
  try {
    const accounts = await klaytn.enable();
    if (!accounts) {
      alert("KaiKas 확장 프로그램을 활성화 해주세요!");
    }
    await connect();
    await check_status();
  } catch (e) {
    if (String(e) == "ReferenceError: klaytn is not defined") {
      alert("KaiKas 확장 프로그램을 설치 해주세요!");
      window.location =
        "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko";
    }
  }
});

async function cntBlockNumber() {
  if (!blockCnt) {
    setInterval(async function () {
      blockNumber += 1;
      document.getElementById("currentblock").innerHTML =
        "<p>CURRENT BLOCK</p>\n" + `<p>#${blockNumber}</p>`;
      let testAccounts = await klaytn.enable();
      let currentAccount = testAccounts[0];

      if (currentAccount !== account) {
        account = currentAccount;
        alert("Your account is " + account);
      }
      connect();
    }, 1000);
    blockCnt = true;
    accountConnect = false;
  }
}
async function connect() {
  accountConnect = true;
  const accounts = await klaytn.enable();
  if (klaytn.networkVersion === 8217) {
    //console.log("메인넷");
  } else if (klaytn.networkVersion === 1001) {
    //console.log("테스트넷");
  } else {
    alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
    return;
  }

  account = accounts[0];
  caver.klay.getBalance(account).then(function (balance) {
    document.getElementById("kaikasBtn").innerHTML =
      "<p>" + String(account).slice(0, 15) + " …</p>";
    document.getElementById("kaikasBtn").style.background = "#3e89c9";
    /*
    document.getElementById("myKlay").innerHTML = `잔액: ${caver.utils.fromPeb(
      balance,
      "KLAY"
    )} KLAY`;
    */
  });

  await check_status();
}
//정보갱신
async function check_status() {
  const PUBLIC = 2;
  const WHITELIST = 1;
  const SPECIAL = 0;
  const myContract = new caver.klay.Contract(ABI, CONTRACTADDRESS);
  await myContract.methods
    .mintingInformation()
    .call()
    .then(function (result) {
      //console.log(result);
      mintIndexForSale = parseInt(result[1]);
      mintLimitPerBlock = parseInt(result[2]);
      mintLimitPerSale = parseInt(result[3]);
      mintStartBlockNumber = parseInt(result[4]);
      maxSaleAmount = parseInt(result[5]);
      mintPrice = parseInt(result[6]);
      round = parseInt(result[7]);

      if (round == SPECIAL) {
        //라운드 표시
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Special</p>";
        //남은 수량 표시
        document.querySelector("progress").value = mintIndexForSale - 1;
        document.getElementById("amount_sign").style.left =
          (mintIndexForSale - 1) / 1.16 + "%";
        document.getElementById("count").innerHTML = `남은수량 : ${
          mintIndexForSale - 1
        }`;
      } else if (round == WHITELIST) {
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Whitelist</p>";
        //남은 수량 표시
        document.querySelector("progress").value = mintIndexForSale - 1;
        document.getElementById("amount_sign").style.left =
          (mintIndexForSale - 1) / 1.16 + "%";
        document.getElementById("count").innerHTML = `남은수량 : ${
          mintIndexForSale - 1
        }`;
      } else if (round == PUBLIC) {
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Public</p>";
        //남은 수량 표시
        document.querySelector("progress").value = mintIndexForSale - 1;
        document.getElementById("amount_sign").style.left =
          (mintIndexForSale - 1) / 1.16 + "%";
        document.getElementById("count").innerHTML = `남은수량 : ${
          mintIndexForSale - 1
        }`;
      } else {
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>None</p>";
        //남은 수량 표시
        document.querySelector("progress").value = mintIndexForSale - 1;
        document.getElementById("amount_sign").style.left =
          (mintIndexForSale - 1) / 1.16 + "%";
        document.getElementById("count").innerHTML = `남은수량 : ${
          mintIndexForSale - 1
        }`;
      }

      document.getElementById("pertransacion").innerHTML =
        "<p>Per Transacion</p>\n" + `<p>${mintLimitPerBlock}개</p>`;

      //document.getElementById("amount").max = mintLimitPerBlock;
      document.getElementById("mintingstartsat").innerHTML =
        "<p>MINTING STARTS AT</p>\n" + `<p>#${mintStartBlockNumber}</p>`;

      document.getElementById("price").innerHTML =
        "<p>Price</p>\n" +
        `<p>${caver.utils.fromPeb(mintPrice, "KLAY")} Klay</p>`;

      document.getElementById("perwallet").innerHTML =
        "<p>Per Wallet</p>\n" + `<p>${mintLimitPerSale}개</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
  /*
  caver.klay.getBalance(account).then(function (balance) {
    document.getElementById("myWallet").innerHTML = `지갑주소: ${account}`;
    document.getElementById("myKlay").innerHTML = `잔액: ${caver.utils.fromPeb(
      balance,
      "KLAY"
    )} KLAY`;
    
  });
  

  //현재 블록 출력
  
  document.getElementById("currentblock").innerHTML =
    "<p>CURRENT BLOCK</p>\n" + `<p>#${blockNumber}</p>`;
    */
  blockNumber = await caver.klay.getBlockNumber();
  cntBlockNumber();
}

//민팅
async function allMint() {
  await check_status();
  if (round == 0) {
    await specialMint(account);
    console.log("sp");
  } else if (round == 1) {
    await whitelistMint(account);
    console.log("wl");
  } else if (round == 2) {
    await publicMint();
    console.log("pb");
  } else {
    alert("민팅 진행 중이 아닙니다!");
  }
  await check_status();
}
const myContract = new caver.klay.Contract(ABI, CONTRACTADDRESS);

async function publicMint() {
  if (klaytn.networkVersion === 8217) {
  } else if (klaytn.networkVersion === 1001) {
  } else {
    alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
    return;
  }
  if (!account) {
    alert("ERROR: 지갑을 연결해주세요!");
    return;
  }
  const amount = document.getElementById("input_amount").value;
  await check_status();
  if (maxSaleAmount + 1 <= mintIndexForSale) {
    alert("모든 물량이 소진되었습니다.");
    return;
  } else if (blockNumber <= mintStartBlockNumber) {
    alert("아직 민팅이 시작되지 않았습니다.");
    return;
  }
  const total_value = amount * mintPrice;

  let estmated_gas;

  await myContract.methods
    .publicMint(amount)
    .estimateGas({
      from: account,
      gas: 6000000,
      value: total_value,
    })
    .then(function (gasAmount) {
      estmated_gas = gasAmount;
      //console.log("gas :" + estmated_gas);
      myContract.methods
        .publicMint(amount)
        .send({
          from: account,
          gas: estmated_gas,
          value: total_value,
        })
        .on("transactionHash", (txid) => {
          //console.log(txid);
        })
        .once("allEvents", (allEvents) => {
          //console.log(allEvents);
        })
        .once("Transfer", (transferEvent) => {
          //console.log(transferEvent);
        })
        .once("receipt", (receipt) => {
          check_status();
          alert("민팅에 성공하였습니다.");
        })
        .on("error", (error) => {
          alert("민팅에 실패하였습니다.");
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      alert("민팅에 실패하였습니다.");
    });
  await check_status();
}

async function whitelistMint(_inputAddress) {
  if ((await isWhitelist()) == true) {
    if (klaytn.networkVersion === 8217) {
      //console.log("메인넷");
    } else if (klaytn.networkVersion === 1001) {
      //console.log("테스트넷");
    } else {
      alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
      return;
    }
    if (!account) {
      alert("ERROR: 지갑을 연결해주세요!");
      return;
    }
    const amount = document.getElementById("input_amount").value;
    await check_status();
    if (maxSaleAmount + 1 <= mintIndexForSale) {
      alert("모든 물량이 소진되었습니다.");
      return;
    } else if (blockNumber <= mintStartBlockNumber) {
      alert("아직 민팅이 시작되지 않았습니다.");
      return;
    }
    const total_value = amount * mintPrice;

    let estmated_gas;

    await myContract.methods
      .whitelistMint(amount)
      .estimateGas({
        from: account,
        gas: 6000000,
        value: total_value,
      })
      .then(function (gasAmount) {
        estmated_gas = gasAmount;
        //console.log("gas :" + estmated_gas);
        myContract.methods
          .whitelistMint(amount)
          .send({
            from: account,
            gas: estmated_gas,
            value: total_value,
          })
          .on("transactionHash", (txid) => {
            //console.log(txid);
          })
          .once("allEvents", (allEvents) => {
            //console.log(allEvents);
          })
          .once("Transfer", (transferEvent) => {
            //console.log(transferEvent);
          })
          .once("receipt", (receipt) => {
            check_status();
            alert("민팅에 성공하였습니다.");
          })
          .on("error", (error) => {
            alert("민팅에 실패하였습니다.");
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        alert("민팅에 실패하였습니다.");
      });
  } else {
    alert("화리 유저만 가능합니다!");
  }
  await check_status();
}

async function specialMint(_inputAddress) {
  if ((await isSpecial()) == true) {
    if (klaytn.networkVersion === 8217) {
      //console.log("메인넷");
    } else if (klaytn.networkVersion === 1001) {
      //console.log("테스트넷");
    } else {
      alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
      return;
    }
    if (!account) {
      alert("ERROR: 지갑을 연결해주세요!");
      return;
    }
    const amount = document.getElementById("input_amount").value;
    await check_status();
    if (maxSaleAmount + 1 <= mintIndexForSale) {
      alert("모든 물량이 소진되었습니다.");
      return;
    } else if (blockNumber <= mintStartBlockNumber) {
      alert("아직 민팅이 시작되지 않았습니다.");
      return;
    }
    const total_value = amount * mintPrice;

    let estmated_gas;

    await myContract.methods
      .whitelistMint(amount)
      .estimateGas({
        from: account,
        gas: 6000000,
        value: total_value,
      })
      .then(function (gasAmount) {
        estmated_gas = gasAmount;
        //console.log("gas :" + estmated_gas);
        myContract.methods
          .whitelistMint(amount)
          .send({
            from: account,
            gas: estmated_gas,
            value: total_value,
          })
          .on("transactionHash", (txid) => {
            //console.log(txid);
          })
          .once("allEvents", (allEvents) => {
            //console.log(allEvents);
          })
          .once("Transfer", (transferEvent) => {
            //console.log(transferEvent);
          })
          .once("receipt", (receipt) => {
            check_status();
            alert("민팅에 성공하였습니다.");
          })
          .on("error", (error) => {
            alert("민팅에 실패하였습니다.");
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        alert("민팅에 실패하였습니다.");
      });
  } else {
    alert("스페셜 유저만 가능합니다!");
  }
  await check_status();
}

//화리 체크
async function isWhitelist() {
  let booldata = false;
  await $.ajax({
    url: "/checkwhitelist",
    dataType: "json",
    type: "POST",
    data: { data: account },
    success: function (result) {
      if (result.result == true) {
        booldata = true;
      } else {
        booldata = false;
      }
    },
  });
  return booldata;
}

async function isSpecial() {
  let booldata = false;
  await $.ajax({
    url: "/checkspecial",
    dataType: "json",
    type: "POST",
    data: { data: account },
    success: function (result) {
      if (result.result == true) {
        booldata = true;
      } else {
        booldata = false;
      }
    },
  });
  return booldata;
}
