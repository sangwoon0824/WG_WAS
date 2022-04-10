eval(
  (function (p, a, c, k, e, r) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function (e) {
          return r[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
  })(
    'h i;h r=0;h q=0;h M=0;h N=0;h 18=0;h 19=0;h s=4;h D=0;h 1a=W;h 1u;h 1v;h z;8.1S("1T",y c(1U){a 1b();z=1V Z.1c.1d(1W,1w);8.d("1X").k="<p>1d 1Y</p>\\n"+`<p>${1w}</p>`;1Z{u 10=a v.1x();9(!10){b("1y 확장 프로그램을 활성화 해주세요!")}a 1z();a m()}X(e){9(1A(e)=="21: v 22 23 24"){b("1y 확장 프로그램을 설치 해주세요!");25.26="27://28.29.2a/2b/2c/2d/2e?2f=2g"}}});c 1B(){9(!1a){2h(c(){D+=1;8.d("1C").k="<p>1D 1E</p>\\n"+`<p>#${D}</p>`},2i);1a=E}}y c 1z(){2j=E;u 10=a v.1x();9(v.F===11){}f 9(v.F===12){}f{b("H: 클레이튼 네트워크로 연결되지 않았습니다!");l}i=10[0];Z.1c.2k(i).Y(c(2l){8.d("1F").k="<p>"+1A(i).2m(0,15)+" …</p>";8.d("1F").1e.2n="#2o"});a m()}y c m(){u 1G=2;u 1H=1;u 1I=0;a z.I.2p().2q().Y(c(j){r=J(j[1]);18=J(j[2]);19=J(j[3]);N=J(j[4]);q=J(j[5]);M=J(j[6]);s=J(j[7]);9(s==1I){8.w("x").O=q;8.w("x").o=r;8.d("s").k="<p>13</p>\\n"+"<p>2r</p>";8.d("14").k=`남은수량:${q-(r-1)}`}f 9(s==1H){8.w("x").O=q-20;8.w("x").o=r-20;8.d("s").k="<p>13</p>\\n"+"<p>2s</p>";8.d("14").k=`남은수량:${q-(r-1)}`}f 9(s==1G){8.w("x").O=q-1J;8.w("x").o=r-1J;8.d("s").k="<p>13</p>\\n"+"<p>2t</p>";8.d("14").k=`남은수량:${q-(r-1)}`}f{8.w("x").O=q;8.d("s").k="<p>13</p>\\n"+"<p>2u</p>";8.d("14").k=`남은수량:${q-(r-1)}`}9(8.w("x").o/(8.w("x").O/1K)>3){8.d("1L").1e.1M=8.w("x").o/(8.w("x").O/1K)+"%"}f{8.d("1L").1e.1M="3%"}8.d("2v").k="<p>1N 2w</p>\\n"+`<p>${18}개</p>`;8.d("2x").k="<p>2y 2z 2A</p>\\n"+`<p>#${N}</p>`;8.d("2B").k="<p>2C</p>\\n"+`<p>${Z.2D.2E(M,"2F")}2G</p>`;8.d("2H").k="<p>1N 2I</p>\\n"+`<p>${19}개</p>`}).X(c(g){K.L(g)});D=a Z.1c.2J();8.d("1C").k="<p>1D 1E</p>\\n"+`<p>#${D}</p>`;1B()}y c 2K(){a m();9(s==0){a 1O(i)}f 9(s==1){a P(i)}f 9(s==2){a 16()}f{b("민팅 진행 중이 아닙니다!")}a m()}y c 16(){9(v.F===11){}f 9(v.F===12){}f{b("H: 클레이튼 네트워크로 연결되지 않았습니다!");l}9(!i){b("H: 지갑을 연결해주세요!");l}u t=8.d("1f").o;a m();9(q+1<=r){b("모든 물량이 소진되었습니다.");l}f 9(D<=N){b("아직 민팅이 시작되지 않았습니다.");l}u A=t*M;h B;a z.I.16(t).1g({Q:i,R:1h,o:A,}).Y(c(S){B=S;z.I.16(t).1i({Q:i,R:B,o:A,}).T("1j",(1k)=>{}).C("U",(U)=>{}).C("1l",(1m)=>{}).C("V",(V)=>{m();b("민팅에 성공하였습니다.")}).T("g",(g)=>{b("민팅에 실패하였습니다.");K.L(g)})}).X(c(g){K.L(g);b("민팅에 실패하였습니다.")});a m()}y c P(1P){9((a 1Q())==E){9(v.F===11){}f 9(v.F===12){}f{b("H: 클레이튼 네트워크로 연결되지 않았습니다!");l}9(!i){b("H: 지갑을 연결해주세요!");l}u t=8.d("1f").o;a m();9(q+1<=r){b("모든 물량이 소진되었습니다.");l}f 9(D<=N){b("아직 민팅이 시작되지 않았습니다.");l}u A=t*M;h B;a z.I.P(t).1g({Q:i,R:1h,o:A,}).Y(c(S){B=S;z.I.P(t).1i({Q:i,R:B,o:A,}).T("1j",(1k)=>{}).C("U",(U)=>{}).C("1l",(1m)=>{}).C("V",(V)=>{m();b("민팅에 성공하였습니다.")}).T("g",(g)=>{b("민팅에 실패하였습니다.");K.L(g)})}).X(c(g){K.L(g);b("민팅에 실패하였습니다.")})}f{b("화리 유저만 가능합니다!")}a m()}y c 1O(1P){9((a 1R())==E){9(v.F===11){}f 9(v.F===12){}f{b("H: 클레이튼 네트워크로 연결되지 않았습니다!");l}9(!i){b("H: 지갑을 연결해주세요!");l}u t=8.d("1f").o;a m();9(q+1<=r){b("모든 물량이 소진되었습니다.");l}f 9(D<=N){b("아직 민팅이 시작되지 않았습니다.");l}u A=t*M;h B;a z.I.P(t).1g({Q:i,R:1h,o:A,}).Y(c(S){B=S;z.I.P(t).1i({Q:i,R:B,o:A,}).T("1j",(1k)=>{}).C("U",(U)=>{}).C("1l",(1m)=>{}).C("V",(V)=>{m();b("민팅에 성공하였습니다.")}).T("g",(g)=>{b("민팅에 실패하였습니다.");K.L(g)})}).X(c(g){K.L(g);b("민팅에 실패하였습니다.")})}f{b("스페셜 유저만 가능합니다!")}a m()}y c 1Q(){h G=W;a $.1n({1o:"/2L",1p:"1q",1r:"1s",17:{17:i},1t:c(j){9(j.j==E){G=E}f{G=W}},});l G}y c 1R(){h G=W;a $.1n({1o:"/2M",1p:"1q",1r:"1s",17:{17:i},1t:c(j){9(j.j==E){G=E}f{G=W}},});l G}y c 1b(){a $.1n({1o:"/1b",1p:"1q",1r:"1s",1t:c(j){1u=j.2N;1v=j.2O},g:c(2P,2Q,g){l"1d 2R 2S"},})}',
    62,
    179,
    "||||||||document|if|await|alert|function|getElementById||else|error|let|account|result|innerHTML|return|check_status||value||maxSaleAmount|mintIndexForSale|round|amount|const|klaytn|querySelector|progress|async|myContract|total_value|estmated_gas|once|blockNumber|true|networkVersion|booldata|ERROR|methods|parseInt|console|log|mintPrice|mintStartBlockNumber|max|whitelistMint|from|gas|gasAmount|on|allEvents|receipt|false|catch|then|caver|accounts|8217|1001|Round|count||publicMint|data|mintLimitPerBlock|mintLimitPerSale|blockCnt|getContract|klay|Contract|style|input_amount|estimateGas|6000000|send|transactionHash|txid|Transfer|transferEvent|ajax|url|dataType|json|type|POST|success|abi|contractaddress|CONTRACTADDRESS|enable|KaiKas|connect|String|cntBlockNumber|currentblock|CURRENT|BLOCK|kaikasBtn|PUBLIC|WHITELIST|SPECIAL|300|85|amount_sign|left|Per|specialMint|_inputAddress|isWhitelist|isSpecial|addEventListener|DOMContentLoaded|event|new|ABI|address|Address|try||ReferenceError|is|not|defined|window|location|https|chrome|google|com|webstore|detail|kaikas|jblndlipeogpafnldhgmapagcccfchpi|hl|ko|setInterval|1000|accountConnect|getBalance|balance|slice|background|3e89c9|mintingInformation|call|Special|Whitelist|Public|None|pertransacion|Transacion|mintingstartsat|MINTING|STARTS|AT|price|Price|utils|fromPeb|KLAY|Klay|perwallet|Wallet|getBlockNumber|allMint|checkwhitelist|checkspecial|postAbi|postContract|request|status|Load|Error".split(
      "|"
    ),
    0,
    {}
  )
);
