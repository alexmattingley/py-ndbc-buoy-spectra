##Argument Documentation

###There are several different arguments that you can pass through url in order to get a desired buoy's energy breakdowns in the format that you want.

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

...lastly google it. If you want to figure out what the buoy number of goleta point is, just google goleta point NOAA buoy number.

####Example of a buoy query

[url]/buoy?buoy=46086