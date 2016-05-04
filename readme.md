#A More accurate buoy api

###Picture this:

Its just before first light, and you just woke up. You pull out your phone and groggily check NOAA to see if that new swell has hit yet. Your local buoy is at 8ft at 20 seconds and your heart jumps into your throat. You knew it was supposed to be good today but you didn't think it would be huge. You grab your step-up and a cup of coffee and run out the door without even checking the cams, you already know it is going to be giant. You get in the car and you drive an hour up the coast to that spot you know will be big and perfect. Every minute passes slowly but you finally arrive. You pull into the parking lot expecting giant scary beasts, but you find something much different. Its dissapointly smaller than it should be and it seems sort of short period and funky despite the light offshore wind. You check your phone again, but its still 8 ft at 20 seconds. 

###What happened?

Despite their simplicity, two band buoy data (8ft @ 20secs) is often not what it seems. That number you see is actually determined by an equation written by the good men and women over at NOAA. Without going into too much detail, that reading is actually an aggregate of all of the energy that has occured over a certain time period in the area where the buoy is located.

The goal of this api is to free that raw data for use by the masses before its ever converted by NOAA into a 2 band reading. We put in the long hours and drank excessive amounts of caffine in order that you, dear web developer, can have a more useable, more accurate buoy reading for your website or application.

###Now what?

Well at this point, you either fall into one of two camps:

1. You are a web developer and you want to use the API. Hurray! Just continue to the documentation below, its pretty straight forward.

2. You are a surfer who does not know what a a JSON object or an API is, nor do you really care, you just want to get barreled and use a more accurate tool to do so. That's cool, we understand. May we recommend some absolutely awesome data based surfing sites that are responsive and use our custom built data?

Greenroomhunter:
<http://greenroomhunter.com/>

Swell Matrix:
<http://swellmatrix.com/>

##API Argument Documentation

###There are several different arguments that you can pass through the url in order to get a desired buoy's energy breakdowns in the format that you want.

- buoy
- datasource
- json
- datatype
- units

###Buoy

For this variable you are going to want to pass in a buoy number for the buoy that you are looking for information for. We are pulling from NOAA, so you need to make sure that the buoy number you use corresponds to the correct number of the buoy on the NOAA website. If you forget to pass in the buoy number in your URL query, then the information will default to the Pt. Loma South Buoy or 46232.

####Some helpful resources for figuring out buoy numbers:

A full list of all available buoys by location on a map. Some of these will work, some of them will not, so test before you settle on one: <http://www.ndbc.noaa.gov/>

A full list of weather stations: <http://www.ndbc.noaa.gov/to_station.shtml> (again, some of these will work others will not)

...lastly google it. If you want to figure out what the buoy number of goleta point is, just "google goleta point NOAA buoy number". It's like magic.

####Example of a buoy query

[url]/buoy?buoy=46086


##Developer Nerd Talk

This API was built on Node, Express and Jade. We are currently using Python to handle the calculations from energy values to the different datatypes. This project is open source, we want to know what you think and how we can make it better. Mark issues or make pull requests as you see fit.