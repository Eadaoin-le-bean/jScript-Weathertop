
const stationProcessor = {
getBeaufort(station)
  {
    const latestDataEntry = stationProcessor.getLatestFromStation(station);
    if(latestDataEntry == null)
        return -1;
    let beaufort = 0;
    if(latestDataEntry == null)
      return 0;
    
    if (latestDataEntry.wSpeed > 0){
      
      if(latestDataEntry.wSpeed == 0){
        beaufort = 0;
        }else if (latestDataEntry.wSpeed >= 1 && latestDataEntry.wSpeed <= 6){
        beaufort = 1;
        }else if(latestDataEntry.wSpeed >= 7 && latestDataEntry.wSpeed <= 11){
        beaufort = 2;
        }else if(latestDataEntry.wSpeed >= 12 && latestDataEntry.wSpeed <= 19){
        beaufort = 3;
        }else if(latestDataEntry.wSpeed >= 20 && latestDataEntry.wSpeed <= 29){
        beaufort = 4;  
        }else if(latestDataEntry.wSpeed >= 30 && latestDataEntry.wSpeed <= 39){
        beaufort = 5;
        }else if(latestDataEntry.wSpeed >= 40 && latestDataEntry.wSpeed <= 50){
        beaufort = 6;
        }else if(latestDataEntry.wSpeed >= 51 && latestDataEntry.wSpeed <= 62){
        beaufort = 7;
        }else if(latestDataEntry.wSpeed >= 63 && latestDataEntry.wSpeed <= 75){
        beaufort = 8;
        }else if(latestDataEntry.wSpeed >= 76 && latestDataEntry.wSpeed <= 87){
        beaufort = 9;
        }else if(latestDataEntry.wSpeed >= 88 && latestDataEntry.wSpeed <= 102){
        beaufort = 10;
        }else if(latestDataEntry.wSpeed >= 103 && latestDataEntry.wSpeed <= 117){
        beaufort = 11; 
        }else if(latestDataEntry.wSpeed >= 117){
        beaufort = 12;
        }  

      }
    return beaufort;
  },
  
  getWeatherFromCode(station) {
    const latestDataEntry = stationProcessor.getLatestFromStation(station);
    if(latestDataEntry == null)
        return '0';
    switch (latestDataEntry.code) {
        case '100':
            return "Clear";
        case '200':
            return "Partial Clouds";
        case '300':
            return "Cloudy";
        case '400':
            return "Light Showers";
        case '500':
            return "Heavy Showers";
        case '600':
            return "Rain";
        case '700':
            return "Snow";
        case '800':
            return "Thunder";
        default:
            return "Code Not Recognised";
    }
  },

  getLatestFromStation(station)
    {
    const length = station.data.length;
    if (length == 0)
      return null;
    const dataEntry = station.data[length -1];
    return dataEntry;

    },
  
  getTempInF(station) 
    {
      const latestDataEntry = stationProcessor.getLatestFromStation(station);
      if(latestDataEntry == null)
        return -1;
        
      const f = latestDataEntry.temp * 9 / 5 + 32;
      return f;
    },
  
  getTemp(station) 
  {
    const latestDataEntry = stationProcessor.getLatestFromStation(station);
    if(latestDataEntry == null)
      return -1;

    const temp = latestDataEntry.temp
    return temp;
  },
  
      getWDir(station) {
        const latestDataEntry = stationProcessor.getLatestFromStation(station);
        if(latestDataEntry == null)
          return 'No Data, try adding a reading';
        
        const wDir = latestDataEntry.wDir
        let d = wDir;
        if (d > 11.25 && d <= 33.75) {
            return "North North-East";
        } else if (d > 33.75 && d <= 56.25) {
            return "North-East";
        } else if (d > 56.25 && d <= 78.75) {
            return "East North-East";
        } else if (d > 78.75 && d <= 101.25) {
            return "East";
        } else if (d > 101.25 && d <= 123.75) {
            return "East South-East";
        } else if (d > 123.75 && d <= 146.25) {
            return "South-East";
        } else if (d > 146.25 && d <= 168.75) {
            return "South South-East";
        } else if (d > 168.75 && d <= 191.25) {
            return "South";
        } else if (d > 191.25 && d <= 213.75) {
            return "South South-West";
        } else if (d > 213.75 && d <= 236.25) {
            return "South-West";
        } else if (d > 236.25 && d <= 258.75) {
            return "West South-West";
        } else if (d > 258.75 && d <= 281.25) {
            return "West";
        } else if (d > 281.25 && d <= 303.75) {
            return "West North-West";
        } else if (d > 303.75 && d <= 326.25) {
            return "North-West";
        } else if (d > 325.25 && d <= 346.75) {
            return "North North-West";
        } else {
            return "North";

        }
    },
  
    getWChill(station) 
      {
        const latestDataEntry = stationProcessor.getLatestFromStation(station);
        if(latestDataEntry == null)
          return -1;
        const wSpeed = latestDataEntry.wSpeed;
        const temp = latestDataEntry.temp;
        const vPow = Math.pow(wSpeed, 0.16);
        const windChill = ((13.12 + (0.6215 * temp)) - (11.37 * vPow)) + (0.3965 * temp * vPow);
        return Math.round(windChill * 100) / 100; 
      },
  
      getPressure(station) 

      {
        const latestDataEntry = stationProcessor.getLatestFromStation(station);
        if(latestDataEntry == null)
          return -1;
        const pressure = latestDataEntry.pressure;
        return pressure;
      
    },
  
    getIcon(station)
        {
        const latestDataEntry = stationProcessor.getLatestFromStation(station);
        if(latestDataEntry == null)
          return '';
        const code = latestDataEntry.code;
          
          
          const map1 = new Map();

          map1.set("100", "large sun outline icon yellow");
          map1.set("200", "large cloud sun icon olive");
          map1.set("300", "large cloud icon teal");
          map1.set("400", "large cloud sun rain icon teal");
          map1.set("500", "large cloud showers heavy icon red");
          map1.set("600", "large cloud rain icon blue");
          map1.set("700", "large snowflake outline icon white");
          map1.set("800", "large bolt icon orange");    
          
          const icon = map1.get(code);
          return icon;
        }
}

module.exports = stationProcessor;