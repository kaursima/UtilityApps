const readLineSync = require('readline-sync');

function retry()
{
  let r = readLineSync.question("Would you like to try any other feature? : Y/N ");
  if(r === "Y" || r === "y") start();
  else return;
}
function print(current) {
  let i = 1;
      for(let element in current.options)
      {
        console.log(i + ". " + current.options[element]); i++;
      } 
}

function start() {
  console.log("\nPlease select which feature you would like to use : \n");
  let i=1;
  for(const element in apps)
  {
    console.log(i + ". " +apps[element].name);
    i++;
  }
  let response = readLineSync.question("");
  response = parseInt(response);
  switch(response) {
    case 1 : apps.url_encode_decode.func(); 
    break;
    case 2 : apps.base64_Encoding_Decoding.func(); 
    break;
    case 3 : apps.string_Hashing.func(); 
    break;
    case 4 : apps.epoch_Converters.func();
    break;
    case 5 : apps.converters.func(); 
    break;
    case 6 : apps.rgb.func(); 
    break;
    case 7 : apps.unit_Converters.func(); 
    break;
    default : console.log("Invalid Choice"); 
  };
  retry();

}

const apps = 
{
  url_encode_decode : {
    name : "URL Encoder/Decoder",
    options : ["Encode","Decode"],
    encode() {
      const url = readLineSync.question("Please enter your URL to be Encoded :\n");
      console.log(encodeURIComponent(url));
    },
    decode() {
      const url = readLineSync.question("Please enter your URL to be Decoded :\n");
      console.log(decodeURIComponent(url));
    },
    func() {
          
      const current = this;
      print(current);
      let r = readLineSync.question("");
      if(r === "1") this.encode();
      else if(r === "2") this.decode();
      else{
        console.log("Invalid choice. Please choose again : ");
        this.func();
      }
    },
      
  },
  base64_Encoding_Decoding : {
    name : "Base64 Encoding/Decoding",
    options : ["Encoding","Decoding"],
    encoding() {
      const url = readLineSync.question("Please enter String to be Encoded :\n");
      //const base64 = Buffer.from(url).toString('base64');
      console.log(Buffer.from(url).toString('base64'));
    },
    decoding() {
      const url = readLineSync.question("Please enter String to be Decoded :\n");
      console.log(Buffer.from(url, 'base64').toString('ascii'));
    },
    func() {
      const current = this;
      print(current);
      let r = readLineSync.question("");
      if(r === "1") this.encoding();
      else if(r === "2") this.decoding();
      else{
        console.log("Invalid choice. Please choose again : ");
        this.func();
      }
    },
  },
  string_Hashing : {
    name : "String hashing",
    options : ["md5","sha1","sha256","sha512"],
    hash(str,hash_type) {
      const crypto = require('crypto');
      console.log(crypto.createHash(hash_type).update(str).digest('hex'));
    },
    func() {
      
      const str = readLineSync.question("Please enter String to be Hashed :\n");
      const current = this;
      print(current);
      let hash_type;
      if(response === "1") hash_type = "md5";
      else if(response === "2") hash_type = "sha1";
      else if(response === "3") hash_type = "sha256";
      else if(response === "4") hash_type = "sha512";
      else {
        console.log("Invalid Choice. Please choose again.");
        this.func();
      }
      this.hash(str,hash_type);
    },
  },
  epoch_Converters : {
    name : "Epoch Converters",
    options : ["toEpoch","toHumanDate"],
    toEpoch(date) {
      console.log(Math.floor(date.getTime()/1000));
    },
    toHumanDate(val) {
      const d = new Date(val*1000);
      console.log(d.toLocaleString());

    },
    func() {
      const current = this;
      print(current);
        const response = readLineSync.question("");
        if(response === "1") {
          const year = readLineSync.question('\nEnter the year ');
          const month = readLineSync.question('Enter the month ');
          const date = readLineSync.question('Enter the date ');
          const hrs = readLineSync.question('Enter the hours ');
          const mins = readLineSync.question('Enter the minutes ');
          const secs = readLineSync.question('Enter the seconds ');
          const HumanDate = new Date(year, month-1, date, hrs, mins,secs);
          this.toEpoch(HumanDate); 
        }
        else if(response === "2"){
          const epochVal = readLineSync.question('\nEnter an epoch value (example - 1611041456)\n');
          this.toHumanDate(epochVal);
        }
        else {
          console.log("Invalid Choice. Please choose again.");
          this.func();
        }
    }
  },
  converters : {
    name : "Binary/Decimal/Hex/Octal Converters",
    options : ["Binary to Decimal","Binary to Hex","Binary to Octal","Decimal to Binary","Decimal to Hex","Decimal to Octal","Octal to Binary","Octal to Decimal","Octal to Hex","Hex to Binary","Hex to Decimal","Hex to Octal"],
      func() {
          const current = this;
          print(current); 
          const response = readLineSync.question("");
          const val = readLineSync.question("Please enter value to be converted : \n");
          if ( response === "1") console.log(parseInt(val, 2).toString(10));
          else if ( response === "2") console.log(parseInt(val, 2).toString(16));
          else if ( response =="3") console.log(parseInt(val, 2).toString(8));
          else if ( response === "4") console.log(parseInt(val, 10).toString(2));
          else if ( response === "5") console.log(parseInt(val, 10).toString(16));
          else if ( response === "6") console.log(parseInt(val, 10).toString(8));
          else if ( response === "7") console.log(parseInt(val, 8).toString(2));
          else if ( response === "8") console.log(parseInt(val, 8).toString(10));
          else if ( response === "9") console.log(parseInt(val, 8).toString(16));
          else if ( response === "10") console.log(parseInt(val, 8).toString(2));
          else if ( response === "11") console.log(parseInt(val, 16).toString(10));
          else if ( response === "12") console.log(parseInt(val, 16).toString(8));
          else {
            console.log("Invalid Choice. Please choose again.");
              this.func();
          }
      }


    },
  rgb : {
    name : "RGB",
    options : ["RGB To Hex", "Hex to RGB"],
    rgbToHex(r,g,b) {
        r = Number(r).toString(16);
        g = Number(g).toString(16);
        b = Number(b).toString(16);
        if (r.length < 2) {
          r = "0" + r;
        }
        if (g.length < 2) {
          g = "0" + g;
        }
        if (b.length < 2) {
          b = "0" + b;
        }
        return "#" + r + g + b;      
    },
    hexTorgb(h) {
        let r = 0, g = 0, b = 0;
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
        } 
        else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        return "("+ +r + "," + +g + "," + +b + ")";
    },
    func() {
        const current = this;
        print(current); 
        const response = readLineSync.question("");
        if(response === "1") {
          const red = readLineSync.question('\nEnter a value for Red : ');
          const green = readLineSync.question('\nEnter a value for Green : ');
          const blue = readLineSync.question('\nEnter a value for Blue : ');
          console.log("\nHex Value " + this.rgbToHex(red,green,blue));
        }
        else if(response === "2") {
          const hexVal = readLineSync.question('\nEnter a hex value ');
          console.log('\nRGB equivalent ' + this.hexTorgb(hexVal));
        }
        else {
          console.log("Invalid Choice. Please choose again.");
          this.func();
        }
      },
  },

  unit_Converters : {
    name : "Unit Converters",
    options : ["Celcius to Farenheit","Farenheit to Celcius", "Km to Miles","Miles to Km"],
    func() {
      const current = this;
      print(current); 
      const response = readLineSync.question("");
      const val = readLineSync.question("Enter value to be converted : \n");
      if ( response === "1") console.log((val * 9 / 5 + 32).toString());
      else if ( response === "2") console.log(((val - 32) * 5 / 9).toString());
      else if ( response =="3") console.log((val * 0.621371).toString());
      else if ( response === "4") console.log((mil / 0.621371).toString());
      else {
          console.log("Invalid Choice. Please choose again.");
          this.func();
      }
    },
  },
  

};
console.log("Hello! Welcome to Utility Apps! ");
start();