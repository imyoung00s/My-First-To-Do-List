const weather = document.querySelector(".js-weather");
const API_KEY = "fe87af5cb91da9c945b9cffc63840cf8";
const COORDS = 'coords';

function getWeather(lat , lng){//API_KEY를 이용하여 날씨 불러오기
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`
  });
  //fetch 안에는 앞에 https:// 넣어주고 백틱(`)사용하기
  //then 데이터가 완전히 들어온 후 호출
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position) {/* 위도와 경도 정보 불러오기 */
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
    /*
    키 이름과 변수 이름이 같을 경우 
    이름 한번만 적고 쉼표로 이어주면 됨
    =
    latitude : latitude,
    longitude : longitude */
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {/* 날씨 물어보기 */
  navigator.geolocation.getCurrentPosition(handleGeoSucces , handleGeoError);
}

function loadcoords() {/* 날씨를 불러오기 */
  const loadedCoords = localStorage.getItem(COORDS);/* lacalStorage에 저장된 날씨 불러오기 */
  if (loadedCoords === null) {/* 날씨정보가 없을 경우 */
    askForCoords();/* 날씨정보 묻기 */
  } else {/* 날씨정보 가져오기 */
    const parseCoords = JSON.parse(loadedCoords);//getWeather
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadcoords();
}

init();