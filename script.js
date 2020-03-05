class Trades {
    constructor(id,date,contract,price,quantity){
        this.id = id
        this.date = date
        this.contract = contract
        this.price = price
        this.quantity = quantity
    }
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25", true);
xhr.onload = function () {
    
    var data = JSON.parse(this.responseText)
    var tradesArray = [];
    var html  = "";
    data.body.intraDayTradeHistoryList.forEach(trade => {
        var newTrade = new Trades();
        newTrade.id = trade.id;
        newTrade.date = trade.date;
        newTrade.contract = trade.conract;
        newTrade.price = trade.price;
        newTrade.quantity = trade.quantity;
        // html += `
        //     <tr>
        //         <th>${trade.id}</th>
        //         <th>${trade.date}</th>
        //         <th>${trade.conract}</th>
        //         <th>${trade.price}</th>
        //         <th>${trade.quantity}</th>
        //     </tr>
        // `
        tradesArray.push(newTrade);
    });
    
    console.log(tradesArray[0])
    toplamTicaretTutari(tradesArray);
    
};


const toplamTicaretTutari = (trades) => {
    var toplam = 0;
    var toplamm=0;
    trades.forEach(price => {
        toplam += price.price;
        toplamm++
    })
    var html = "";
    html+= `
        <tr>
            <th>${toplam}TL</th>
            <th>${toplamm}</th>
        </tr>
    `
    document.querySelector("#trades").innerHTML = html;
}


xhr.send();

// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//       // XHR for Chrome/Firefox/Opera/Safari.
//       xhr.open("GET", "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25", true);
//       xhr.onload = function(){
//           console.log(xhr.responseText);
//       }
//     } else if (typeof XDomainRequest != "undefined") {
//       // XDomainRequest for IE.
//       xhr = new XDomainRequest();
//       xhr.open("GET", "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25");
//       xhr.onload = function(){
//         console.log(xhr.responseText);
//     }
//     } else {
//       // CORS not supported.
//       xhr = null;
//     }
//     return xhr;
// }

// fetch("https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25",{mode: 'no-cors'}).then(function (response) {
//     return response
// }).then(response => response.text())
// .then(xmlString => parseXML(xmlString))
// .then(data => console.log(data));

// $(document).ready(function(){
//     $.ajax({
//         type:"GET",
//         url:"https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25",
//         dataType:"xml",
//         success: function(data) {
//             $('.result').html(data);
//             alert('Load was performed.');
//           }
//     });
  
// });

// function xmlParser(xml){
//     $()
// }

// let dataAsJson = {};
// fetch('https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2020-02-26&startDate=2020-02-25',{mode: 'no-cors'}).then(response => response.text()).then(str => {
//     dataAsJson = JSON.parse(xml2json(str));
// }).then(() => {
//     console.log(`Station id returned from the WS is: ${dataAsJson.elements[0].elements[0].elements[0].elements[0].elements[0].elements.filter(obj => { return obj.name == 'stnr'; })[0].elements[0].text} Expecting 68050 here!`);
// });