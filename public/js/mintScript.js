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
let specialTXT = [
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
];
document.addEventListener("DOMContentLoaded", async function (event) {
  await getContract();
  myContract = new caver.klay.Contract(abi, contractaddress);
  document.getElementById("address").innerHTML =
    "<p>Contract Address</p>\n" + `<p>${contractaddress}</p>`;
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
    .mintingInformation()
    .call()
    .then(function (result) {
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
        document.getElementById("count").innerHTML = `남은수량:${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
      } else if (round == WHITELIST) {
        document.querySelector("progress").max = maxSaleAmount - 20;
        document.querySelector("progress").value = mintIndexForSale - 20;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Whitelist</p>";
        document.getElementById("count").innerHTML = `남은수량:${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
      } else if (round == PUBLIC) {
        document.querySelector("progress").max = maxSaleAmount - 300;
        document.querySelector("progress").value = mintIndexForSale - 300;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>Public</p>";
        document.getElementById("count").innerHTML = `남은수량:${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
      } else {
        document.querySelector("progress").max = maxSaleAmount;
        document.getElementById("round").innerHTML =
          "<p>Round</p>\n" + "<p>None</p>";
        document.getElementById("count").innerHTML = `남은수량:${
          maxSaleAmount - (mintIndexForSale - 1)
        }`;
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
        "<p>Per Transacion</p>\n" + `<p>${mintLimitPerBlock}개</p>`;
      document.getElementById("mintingstartsat").innerHTML =
        "<p>MINTING STARTS AT</p>\n" + `<p>#${mintStartBlockNumber}</p>`;
      document.getElementById("price").innerHTML =
        "<p>Price</p>\n" +
        `<p>${caver.utils.fromPeb(mintPrice, "KLAY")}Klay</p>`;
      document.getElementById("perwallet").innerHTML =
        "<p>Per Wallet</p>\n" + `<p>${mintLimitPerSale}개</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
  blockNumber = await caver.klay.getBlockNumber();
  document.getElementById("currentblock").innerHTML =
    "<p>CURRENT BLOCK</p>\n" + `<p>#${blockNumber}</p>`;
  cntBlockNumber();
}
async function allMint() {
  await check_status();
  if (round == 0) {
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
