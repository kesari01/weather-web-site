const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

  const query = req.body.cityName
  const apiKey = "paste your api key here"
  const unit = "metric"
  const api_url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit

  https.get(api_url, function(res2) {
    //console.log(res2) will print all the information about the working condition of that api in powershell

    res2.on("data", function(data){
      const weatherData = JSON.parse(data)
      // console.log(weatherData) will print all the information about the request city in powershell

      const temp = weatherData.main.temp
      const main = weatherData.weather[0].main
      const description = weatherData.weather[0].description
      const speed = weatherData.wind.speed
      console.log(main)
      const pressure = weatherData.main.pressure
      const humidity = weatherData.main.humidity
      const lon = weatherData.coord.lon
      const lat = weatherData.coord.lat

      // res1.write("<h1> temperature = "+ temp)
      // use to print on web page becoz there can be only one .send which will at the end only

      const icon = weatherData.weather[0].icon
      const image_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      // res.write("<h1>temperature of "+ query +" is "+temp+" degree celcius</h1>")
      res.write("<h1>weather information of "+ query +" city</h1>")
      res.write("<h3>temperature is "+temp+" degree celcius</h3>")
      res.write("<h3>weather is "+main+"</h3>")
      res.write("<h3>weather description is "+description+"</h3>")
      res.write("<h3>wind speed is "+speed+" meter/sec</h3>")
      res.write("<h3>pressure is "+pressure+" hPa</h3>")
      res.write("<h3>humidity is "+humidity+" %</h3>")
      res.write("<h3>longitude is "+lon+"</h3>")
      res.write("<h3>latitude is "+lat+"</h3>")
      res.write("")
      // res.write("<img src=" + image_url + ">")
      res.send()
    })
  })
  // res1.send("Server is up and running...")

  console.log("post request received")
  console.log(req.body.cityName)
})

app.listen(3000, function() {
  console.log("Server is running on port 3000...")
})
