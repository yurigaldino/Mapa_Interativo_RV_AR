// import axios from "axios";

/*
async function listarAISData(){
  let ais_code = {
    nmea: "!AIVDM,1,1,,B,1:U7d90P00trTrGjr?0>4?wRR@Lf,0*29"
  };

  let response = await fetch(
    'http://ais.tbsalling.dk/decode', {
    method: "POST",
    // dataType : "json",
    // contentType: 'application/json',
    headers: {
        // 'Accept': 'application/json',
        contentType: "application/json",
      },    
    body: JSON.stringify(ais_code)
    // body: {
    //   "nmea": "!AIVDM,1,1,,B,1:U7d90P00trTrGjr?0>4?wRR@Lf,0*29"
    // }
  }).then(response => {
    // alert(`Response: ${response}`)
    console.log(`Response: ${response}`);
  })
  .catch(err => {
    // alert(`Error: ${err}`)
    console.error(`Error: ${err}`);
  })

  let result = await response.json();
  alert(result);
}
*/


//fetch test
// fetch(
//   'http://ais.tbsalling.dk/decode', {
//   method: "POST",
//   // dataType : "json",
//   // contentType: 'application/json',
//   headers: {
//       // 'Accept': 'application/json',
//       contentType: "application/json",
//     },    
//   body: {
//     "nmea": "!AIVDM,1,1,,B,1:U7d90P00trTrGjr?0>4?wRR@Lf,0*29"
//   }
// }).then(response => {
//   console.log(`Response: ${response}`);
// })
// .catch(err => {
//   console.error(`Error: ${err}`);
// })

// ARQUIVO ais_small.txt sendo lido e função de post response api sendo chamada
var lista = []
var contador = 0

const fs = require('fs')
fs.readFile('./ais_small.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  var textByLine = data.split("\r\n")

  for (line of textByLine) {
    var lista = []
    // console.log(line)
    API(line)
  }
})



function API(line) {
  const codigoAIS = line

  // axios test pelo interpretador node.js
  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'http://ais.tbsalling.dk/decode',
    headers: {
      'user-agent': 'vscode-restclient',
      'content-type': 'application/json'
    },
    data: {
      nmea: codigoAIS
    }
  };

  axios.request(options).then(
    function (response) {

      let obj = response.data[0];

      let message_type = obj.nmeaMessages[0].messageType //AIVDM or AIVDO
      let {
        latitude,
        longitude
      } = obj;
      let COG = obj.courseOverGround
      let SOG = obj.speedOverGround
      let nav_status = obj.navigationStatus
      let mmsi = obj.sourceMmsi.mmsi

      var obj_string = `{"message_type":"${message_type}","mmsi":${mmsi},"latitude":${latitude},"longitude":${longitude},"nav_status":"${nav_status}","COG":${COG},"message_type":"${message_type}","SOG":${SOG}}`;
      var obj_json = JSON.parse(obj_string);

      // //console.log(obj);

      lista.push(obj_json)
      require('fs').writeFile('./data/ais_decoded.json', JSON.stringify(lista),
        function (err) {
          if (err) {
            console.error('Crap happens');
          }
        }
      );

      
      return console.log(lista);



    }).catch(function (error) {
      contador += 1
    //console.error(`///////////////////ERRO: ${error.config.data}`);
    //console.error("ESTE CÓDIGO AIS NÃO PASSOU ##########################################################################");
  });
}