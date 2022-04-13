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
let abi;
let contractaddress;
let myContract;
let balanceOfAccount;

document.addEventListener("DOMContentLoaded", async function (event) {
  await getContract();
  myContract = new caver.klay.Contract(abi, contractaddress);
  /*document.getElementById("address").innerHTML =
    "<p>Contract Address</p>\n" + `<p>${contractaddress}</p>`;
    */
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
function cntBlockNumber() {
  if (!blockCnt) {
    setInterval(function () {
      blockNumber += 1;
      document.getElementById("currentblock").innerHTML =
        "<p>CURRENT BLOCK</p>\n" + `<p>#${blockNumber}</p>`;
      check_status();
    }, 1000);
    blockCnt = true;
  }
}
async function connect() {
  accountConnect = true;
  const accounts = await klaytn.enable();
  if (klaytn.networkVersion === 8217) {
  } else if (klaytn.networkVersion === 1001) {
  } else {
    alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
    return;
  }
  account = accounts[0];
  caver.klay.getBalance(account).then(function (balance) {
    document.getElementById("kaikasBtn").innerHTML =
      "<p>" + String(account).slice(0, 15) + " …</p>";
    document.getElementById("kaikasBtn").style.background = "#3e89c9";
  });
  await check_status();
}
async function check_status() {
  const PUBLIC = 2;
  const WHITELIST = 1;
  const SPECIAL = 0;
  await myContract.methods
    .balanceOf(account)
    .call()
    .then((result2) => {
      balanceOfAccount = parseInt(result2);
    });

  await myContract.methods
    .mintingInformation()
    .call()
    .then(async function (result) {
      mintIndexForSale = parseInt(result[1]);
      mintLimitPerBlock = parseInt(result[2]);
      mintLimitPerSale = parseInt(result[3]);
      mintStartBlockNumber = parseInt(result[4]);
      maxSaleAmount = parseInt(result[5]);
      mintPrice = parseInt(result[6]);
      round = parseInt(result[7]);
      if (round == SPECIAL) {
        document.querySelector("progress").max = maxSaleAmount;
        document.querySelector("progress").value = mintIndexForSale;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Special</p>";
        document.getElementById("count").innerHTML = `남은 수량 :${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
        await myContract.methods
          .isSpecialList(account)
          .call()
          .then((result2) => {
            document.getElementById("holdnfts").style.display = "none";
            document.getElementById("approval").style.display = "block";
            document.querySelector("#approval p:first-child").innerHTML =
              "Speical";
            if (result2 == true) {
              document.querySelector("#approval p:last-child").style.color =
                "#1cb80f";
              document.querySelector("#approval p:last-child").innerHTML =
                "✅ Approved";
            } else {
              document.querySelector("#approval p:last-child").style.color =
                "#94160d";
              document.querySelector("#approval p:last-child").innerHTML =
                "Not Approved";
            }
          });
      } else if (round == WHITELIST) {
        document.querySelector("progress").max = maxSaleAmount - 20;
        document.querySelector("progress").value = mintIndexForSale - 20;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Whitelist</p>";
        document.getElementById("count").innerHTML = `남은 수량 :${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
        await myContract.methods
          .isWhiteList(account)
          .call()
          .then((result2) => {
            document.getElementById("holdnfts").style.display = "none";
            document.getElementById("approval").style.display = "block";
            document.querySelector("#approval p:first-child").innerHTML =
              "WhiteList";
            if (result2 == true) {
              document.querySelector("#approval p:last-child").style.color =
                "#1cb80f";
              document.querySelector("#approval p:last-child").innerHTML =
                "✅ Approved";
            } else {
              document.querySelector("#approval p:last-child").style.color =
                "#94160d";
              document.querySelector("#approval p:last-child").innerHTML =
                "Not Approved";
            }
          });
      } else if (round == PUBLIC) {
        document.querySelector("progress").max = maxSaleAmount;
        document.querySelector("progress").value = mintIndexForSale;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Public</p>";
        document.getElementById("count").innerHTML = `남은 수량 :${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
        document.getElementById("approval").style.display = "none";
        document.getElementById("holdnfts").style.display = "block";
        document.querySelector("#holdnfts p:last-child").innerHTML =
          String(balanceOfAccount);
      } else {
        document.querySelector("progress").max = maxSaleAmount;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>None</p>";
        document.getElementById("count").innerHTML = `남은 수량 :${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
        document.getElementById("approval").style.display = "none";
        document.getElementById("holdnfts").style.display = "block";
        document.querySelector("#holdnfts p:last-child").innerHTML =
          String(balanceOfAccount);
      }
      if (
        document.querySelector("progress").value /
          (document.querySelector("progress").max / 85) >
        3
      ) {
        document.getElementById("amount_sign").style.left =
          document.querySelector("progress").value /
            (document.querySelector("progress").max / 85) +
          "%";
      } else {
        document.getElementById("amount_sign").style.left = "3%";
      }
      document.getElementById("pertransacion").innerHTML =
        "<p>Per Transacion</p>\n" + `<p>${mintLimitPerBlock}</p>`;
      document.getElementById("mintingstartsat").innerHTML =
        "<p>MINTING STARTS AT</p>\n" + `<p>#${mintStartBlockNumber}</p>`;
      document.getElementById("price").innerHTML =
        "<p>Price</p>\n" + `<p>${caver.utils.fromPeb(mintPrice, "KLAY")}</p>`;
      document.getElementById("perwallet").innerHTML =
        "<p>Per Wallet</p>\n" + `<p>${mintLimitPerSale}</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
  if (!blockCnt) {
    blockNumber = await caver.klay.getBlockNumber();
    /*document.getElementById("currentblock").innerHTML =
    "<p>CURRENT BLOCK</p>\n" + `<p>#${blockNumber}</p>`;*/
    cntBlockNumber();
  }
}

async function allMint() {
  await connect();
  await check_status();
  //네트워크 필터
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
  let accBalance;
  await caver.klay.getBalance(account).then((result) => {
    accBalance = parseInt(result);
    console.log(mintPrice);
    console.log(mintPrice > accBalance);
  });
  let amount = document.getElementById("input_amount").value;

  //물약, 블럭, 잔액 필터
  if (maxSaleAmount + 1 <= mintIndexForSale) {
    alert("모든 물량이 소진되었습니다.");
    return;
  } else if (blockNumber <= mintStartBlockNumber) {
    alert("아직 민팅이 시작되지 않았습니다.");
    return;
  } else if (mintPrice > accBalance) {
    alert("지갑 잔액이 부족합니다!");
    return;
  } else if (mintLimitPerSale < balanceOfAccount + parseInt(amount)) {
    alert("지갑당 보유량 초과!");
    return;
  } else if (
    maxSaleAmount + 1 <
    parseInt(mintIndexForSale) + parseInt(amount)
  ) {
    alert("최대 물량을 넘어선 민팅입니다!");
    return;
  } else if (parseInt(amount) > mintLimitPerBlock) {
    alert("트랜잭션당 제한 : " + String(mintLimitPerBlock) + "개");
    return;
  }
  // 라운드 필터
  if (round == 0) {
    // 라운드 필터
    await specialMint(account);
  } else if (round == 1) {
    await whitelistMint(account);
  } else if (round == 2) {
    await publicMint();
  } else {
    alert("민팅 진행 중이 아닙니다!");
  }
  await check_status();
}
async function publicMint() {
  const amount = document.getElementById("input_amount").value;

  const total_value = amount * mintPrice;
  let estmated_gas;
  await myContract.methods
    .publicMint(amount)
    .estimateGas({ from: account, gas: 6000000, value: total_value })
    .then(function (gasAmount) {
      estmated_gas = gasAmount;
      myContract.methods
        .publicMint(amount)
        .send({ from: account, gas: estmated_gas, value: total_value })
        .on("transactionHash", (txid) => {})
        .once("allEvents", (allEvents) => {})
        .once("Transfer", (transferEvent) => {})
        .once("receipt", (receipt) => {
          check_status();
          alert("민팅에 성공하였습니다.");
        })
        .on("error", (error) => {
          alert("에러2: 민팅에 실패하였습니다.");
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      alert("public mint not allow");
    });
  await check_status();
}
async function whitelistMint(_inputAddress) {
  const amount = document.getElementById("input_amount").value;

  const total_value = amount * mintPrice;
  let estmated_gas;
  await myContract.methods
    .whitelistMint(amount)
    .estimateGas({ from: account, gas: 6000000, value: total_value })
    .then(function (gasAmount) {
      estmated_gas = gasAmount;
      myContract.methods
        .whitelistMint(amount)
        .send({ from: account, gas: estmated_gas, value: total_value })
        .on("transactionHash", (txid) => {})
        .once("allEvents", (allEvents) => {})
        .once("Transfer", (transferEvent) => {})
        .once("receipt", (receipt) => {
          check_status();
          alert("민팅에 성공하였습니다.");
        })
        .on("error", (error) => {
          alert("에러2: 민팅에 실패하였습니다.");
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      alert("whitelist mint not allow");
    });

  await check_status();
}
async function specialMint(_inputAddress) {
  const amount = document.getElementById("input_amount").value;

  const total_value = amount * mintPrice;
  let estmated_gas;
  await myContract.methods
    .speciallistMint(amount)
    .estimateGas({ from: account, gas: 6000000, value: total_value })
    .then(function (gasAmount) {
      estmated_gas = gasAmount;
      myContract.methods
        .speciallistMint(amount)
        .send({ from: account, gas: estmated_gas, value: total_value })
        .on("transactionHash", (txid) => {})
        .once("allEvents", (allEvents) => {})
        .once("Transfer", (transferEvent) => {})
        .once("receipt", (receipt) => {
          check_status();
          alert("민팅에 성공하였습니다.");
        })
        .on("error", (error) => {
          alert("에러2 : 민팅 실패");
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      alert("special mint not allow");
    });

  await check_status();
}

async function getContract() {
  await $.ajax({
    url: "/getContract",
    dataType: "json",
    type: "POST",
    success: function (result) {
      abi = result.postAbi;
      contractaddress = result.postContract;
    },
    error: function (request, status, error) {
      return "Contract Load Error";
    },
  });
}
