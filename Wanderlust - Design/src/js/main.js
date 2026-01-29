
//----Api functions---//
async function Get_All_Countries()
{
    showLoading()
    var data = await fetch("https://date.nager.at/api/v3/AvailableCountries")
    var parsedData = await data.json()
    hideLoading()
    return parsedData;

}

async function Get_Holidays_By_Year(year, countryCode) 
{
        showLoading()

    var data = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    var parsedData = await data.json()
  hideLoading()
    return parsedData;

}

async function Get_Long_Weekends(year, countryCode) 
{
        showLoading()

    var data = await fetch(`https://date.nager.at/api/v3/LongWeekend/${year}/${countryCode}`)
    var parsedData = await data.json()
  hideLoading()
    return parsedData;

}

var currentWeather='temperature_2m,temperature_2m_max,temperature_2m_min,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index'
var dailyWeather='weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant'
var hourlyWeather='temperature_2m,weather_code,precipitation_probability'
async function Get_Weather_Forecast(latitude,longitude,current,hourly,daily,timezone) // quite complex
{
        showLoading()

    var data = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&hourly=${hourly}&daily=${daily}&timezone=${timezone}`
        )

    var parsedData = await data.json()
  hideLoading()
    return parsedData

}
async function Search_Events_By_City(city,countryCode,size) 
{
        showLoading()
        try{
            
            var data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=VkolD6U2K4GnDaXk2FPSmGYy4TUqvSsr&city=${city}&countryCode=${countryCode}&size=${size}`)
            
            var parsedData = await data.json()
        }
        catch(error)
        {
            hideLoading()
            return "not found"}
  hideLoading()
    return parsedData

}

async function Get_Latest_Exchange_Rates() //error - to many requests (Quota-reached)
{
        showLoading()

    var data = await fetch(`https://v6.exchangerate-api.com/v6/805842951e5953ad31497176/latest/USD`)

    var parsedData = await data.json()
  hideLoading()
    return parsedData

}

async function Convert_Pair(Base_currency,Target_currency,Amount_to_convert) //error - to many requests (Quota-reached)
{
        showLoading()

    var data = await fetch(`https://v6.exchangerate-api.com/v6/805842951e5953ad31497176/pair/${Base_currency}/${Target_currency}/${Amount_to_convert}`)

    var parsedData = await data.json()
  hideLoading()
    return parsedData

}

async function Get_Country_by_Code(countryCode) 
{
        showLoading()

    var data = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)

    var parsedData = await data.json()
  hideLoading()
    return parsedData

}

async function Get_Sun_Times_for_Location(lat,lng,date,formatted) 
{
        showLoading()

    var data = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=${formatted}`)

    var parsedData = await data.json()
  hideLoading()
    return parsedData

}

async function Get_Flag_PNG(size=0,CountryCode="ar") //most of time,use await Get_Flag_PNG(40) ).url -- size would be implemented when needed :)
{
        showLoading()

    var data = await fetch(`https://flagcdn.com/w40/${CountryCode}.png`)
    hideLoading()
    return data

}

//example and tests
// console.log(await Get_All_Countries())
// console.log(await Get_Holidays_By_Year(2026, "RU"))

// console.log(await Get_Long_Weekends(2025, "EG"))

// console.log(await Get_Weather_Forecast(40.7128,74.006,"temperature_2m","weather_code",'weather_code',"auto"))

// console.log(await Search_Events_By_City("","US",20))

// // console.log(await Get_Latest_Exchange_Rates()) has errors
// // console.log(await Convert_Pair("USD","EGY",100)) has errors

// console.log(await Get_Country_by_Code("AR"))

// console.log(await Get_Sun_Times_for_Location(40.7128,-74.006,"2026-01-25"))

// console.log((await Get_Flag_PNG("ru") ).url )


//----Views functions -----//

function resetViews()
{
   let viewGroup=document.getElementsByClassName("view")
   let PageTitle=document.getElementById("page-title")
   let pageSubtitle=document.getElementById("page-subtitle")

   PageTitle.textContent="";
   pageSubtitle.textContent="";
   
  for(var i=0;i<viewGroup.length;i++)
  {
      viewGroup.item(i).classList.remove("active")
    }
      


}

function dashboardView()
{
    let currentview=document.getElementById("dashboard-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Dashboard"
    pageSubtitle.textContent="Welcome back! Ready to plan your next adventure?"
    currentview.classList.add("active")
}
function holidaysView()
{
    let currentview=document.getElementById("holidays-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Holidays"
    pageSubtitle.textContent="Explore public holidays around the world"
    currentview.classList.add("active")
    resetHolidaySection()
    assignHolidays()
}

function eventsView()
{
    let currentview=document.getElementById("events-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Events"
    pageSubtitle.textContent="Find concerts, sports, and entertainment"
    currentview.classList.add("active")
    resetEventSection()
    assignEvents()
}
function weatherView()
{
    let currentview=document.getElementById("weather-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Weather"
    pageSubtitle.textContent="Check forecasts for any destination"
    currentview.classList.add("active")
    resetWeatherSection()
    assignWeather()
}
function LongWeekendView()
{
    let currentview=document.getElementById("long-weekends-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Long Weekends"
    pageSubtitle.textContent="Find the perfect mini-trip opportunities"
    currentview.classList.add("active")
    resetLongWeekend()
    assignLongWeekend()
}

function CurrencyView()
{
    let currentview=document.getElementById("currency-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="Currency"
    pageSubtitle.textContent="Convert currencies with live exchange rates"
    currentview.classList.add("active")
}
function sunTimesView()
{
    let currentview=document.getElementById("sun-times-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="sun Times"
    pageSubtitle.textContent="Check sunrise and sunset times worldwide"
    currentview.classList.add("active")
    resetSunMain()
    assignSunTimes()
}

function myPlansView()
{
    let currentview=document.getElementById("my-plans-view")
    let PageTitle=document.getElementById("page-title")
    let pageSubtitle=document.getElementById("page-subtitle")
    resetViews()
    PageTitle.textContent="My Plans"
    pageSubtitle.textContent="Your saved holidays and events"
    currentview.classList.add("active")
}



//-----  side Bar -----//
let navItems=document.getElementsByClassName("nav-item")
function resetActiveButtons()
{
    
    for(let i=0;i<navItems.length;i++)
    navItems.item(i).classList.remove("active")
}
navItems.item(0).addEventListener("click",function()
{
    resetActiveButtons()
    this.classList.add("active")
    dashboardView()
})
navItems.item(1).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

    holidaysView()
})
navItems.item(2).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

    eventsView()
})
navItems.item(3).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

    weatherView()
})
navItems.item(4).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

    LongWeekendView()
})
navItems.item(5).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

    CurrencyView()
})
navItems.item(6).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

   sunTimesView()
})
navItems.item(7).addEventListener("click",function()
{
        resetActiveButtons()
    this.classList.add("active")

   myPlansView()
})

//----Dashboard search---//

var searchSection=document.getElementsByClassName("search-section")
searchSection=searchSection.item(0)

var DashboardOptions = document.getElementById("global-country")
console.log(searchSection)

var SelectedCountry;

if(localStorage.getItem('userCountry')!=null)
{
SelectedCountry=JSON.parse(localStorage.getItem('userCountry'))
console.log(SelectedCountry)
showSelectedCard(SelectedCountry)
ShowMainCard()
}

async function showCountriesOpt()//show options of search country
{
    let countries=await Get_All_Countries()
    // let flags=[]
    // for(let i=0;i<countries.length;i++)
    // {

    //   flags.push(await Get_Flag_PNG(1,String(countries[i].countryCode).toLowerCase()))  
    //   flags[i]=flags[i].url
    // }
    // console.log(flags)
    console.log("countries in Countires Options:",countries)
    for(let i=0;i<countries.length;i++)
    {
        DashboardOptions.innerHTML+=
        `
        <option value="${countries[i].countryCode}"><img src="https://flagcdn.com/w40/ad.png" alt=""/>${countries[i].name}</option>
        `
    }
    
    showCityOpt()

}
async function showCityOpt()//show options of search city - only show capitals (cities isn't sent from api)
{
    

    let CountrySearch=document.getElementById("global-country")
    let CitySearch=document.getElementById("global-city")

    CountrySearch.addEventListener("change",async function()
    {
     let CountryDetails=await Get_Country_by_Code(this.value)
    console.log("set City of search as:",CountryDetails[0].capital)
    CitySearch.innerHTML=``;

    CitySearch.innerHTML+=
    `
            <option value="${CountryDetails[0].capital}">${CountryDetails[0].capital}</option>
    `
    showSelectedCard(CountryDetails)
    })


    
    
    
}



function showSelectedCard(CountryDetails)
{
    SelectedCountry=CountryDetails;
    let SelectedCard=document.getElementById("selected-destination")
    SelectedCard.classList.remove("hidden")
    SelectedCard.innerHTML=createCard(CountryDetails)
    let exitbutton=document.getElementById("clear-selection-btn")
    exitbutton.addEventListener('click',function(){SelectedCard.classList.add("hidden")})
}

function createCard(CountryDetails)
{
    console.log(CountryDetails)
    
    return `
                <div class="selected-flag">
                  <img id="selected-country-flag" src="${CountryDetails[0].flags.png}" alt="Egypt">
                </div>
                <div class="selected-info">
                  <span class="selected-country-name" id="selected-country-name">${CountryDetails[0].name.common}</span>
                  <span class="selected-city-name" id="selected-city-name">• ${CountryDetails[0].capital}</span>
                </div>
                <button  class="clear-selection-btn" id="clear-selection-btn">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
                </button>
              `


}


showCountriesOpt()

//----big dashboard card---//note: selectedCountry declared and assigned from section above


//------clock functinoality----/
let Timeline = {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
var intervalId=null;
function clock(SelectedCountry)
{
    try{

        var currentTime;
        Timeline.timeZone=String(SelectedCountry[0].timezones[0]).replace("UTC","")
        let formatter = new Intl.DateTimeFormat([],Timeline  );
        currentTime=formatter.format(new Date());
        //   console.log('time:',currentTime)
        return currentTime
    }
    catch(error)
    {return "not found"}
}

///-------------rest of dashboard "explore event"-------------//
var searchBtn=document.getElementById("global-search-btn")
function addLanguagesTags(language)
{
    let langContainer=document.getElementsByClassName("languages-collection")
   
    for(let i=0;i<language.length;i++)
    {
        console.log("at function,addLanguageTags added language:",language[i])
        langContainer.item(0).innerHTML+=`<span class="extra-tag">${language[i]}</span>`
    }


}
function addNeighborsTags(NegCountry)
{
    
    let negContainer=document.getElementsByClassName("border-collection")
    try
    {
        console.log(NegCountry)
        for(let i=0;i<NegCountry.length;i++)
            {
                console.log("at addNeighborsTags added neighbouring countries:",NegCountry[0])
                negContainer.item(0).innerHTML+=`<span class="extra-tag border-tag">${NegCountry[i]}</span>`
            }
        }
        catch(error){
                            negContainer.item(0).innerHTML+=`<span class="extra-tag border-tag">Not Found</span>`

        }


}
function ShowMainCard()
{
if(!SelectedCountry)
{
    return
}
 var currency=SelectedCountry[0].currencies
 var curSymbol= SelectedCountry[0].currencies[Object.keys(currency)[0]].symbol
 var curName= SelectedCountry[0].currencies[Object.keys(currency)[0]].name

//    console.log('at',SelectedCountry[0].currencies[Object.keys(currency)[0]].symbol)
        
let SectionCard=document.getElementById("dashboard-country-info-section")
SectionCard.innerHTML=
` 
<div class="section-header">
              <h2><i class="fa-solid fa-flag"></i> Country Information</h2>
            </div>
            <div id="dashboard-country-info" class="dashboard-country-info">
              
              <div class="dashboard-country-header">
                <img src="${SelectedCountry[0].flags.png}" alt="${SelectedCountry[0].name.common}" class="dashboard-country-flag">
                <div class="dashboard-country-title">
                  <h3> ${SelectedCountry[0].name.common} </h3>
                  <p class="official-name">${SelectedCountry[0].name.official}</p>
                  <span class="region"><i class="fa-solid fa-location-dot"></i>${SelectedCountry[0].region}</span>
                </div>
              </div>
              
              <div class="dashboard-local-time">
                <div class="local-time-display">
                  <i class="fa-solid fa-clock"></i>
                  <span class="local-time-value" id="country-local-time"></span>
                  <span class="local-time-zone">${SelectedCountry[0].timezones[0]}</span>
                </div>
              </div>
              
              <div class="dashboard-country-grid">
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-building-columns"></i>
                  <span class="label">Capital</span>
                  <span class="value">${SelectedCountry[0].capital}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-users"></i>
                  <span class="label">Population</span>
                  <span class="value">${SelectedCountry[0].population}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-ruler-combined"></i>
                  <span class="label">Area</span>
                  <span class="value">${SelectedCountry[0].area} km²</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-globe"></i>
                  <span class="label">Continent</span>
                  <span class="value">${SelectedCountry[0].continents[0]}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-phone"></i>
                  <span class="label">Calling Code</span>
                  <span class="value">${SelectedCountry[0].ccn3}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-car"></i>
                  <span class="label">Driving Side</span>
                  <span class="value">${SelectedCountry[0].car.side}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-calendar-week"></i>
                  <span class="label">Week Starts</span>
                  <span class="value">${SelectedCountry[0].startOfWeek}</span>
                </div>
              </div>
              
              <div class="dashboard-country-extras">
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                  <div class="extra-tags">
                    <span class="extra-tag">${curName} (${curSymbol})</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-language"></i> Languages</h4>
                  <div class="extra-tags languages-collection">
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
                  <div class="extra-tags border-collection">
                  </div>
                </div>
              </div>
              
              <div class="dashboard-country-actions">
                <a href="${SelectedCountry[0].maps.googleMaps}" target="_blank" class="btn-map-link">
                  <i class="fa-solid fa-map"></i> View on Google Maps
                </a>
              </div>
              
            </div>

`
if(intervalId==null)
{
    console.log("working intervals:",intervalId)
    let localTimeElement=document.getElementById('country-local-time')
    intervalId= setInterval(function(){
        
        localTimeElement.textContent=  clock(SelectedCountry);
    },1000) 
}
else
{
   
    console.log("working intervals:",intervalId)
     clearInterval(intervalId)
     let localTimeElement=document.getElementById('country-local-time')
    intervalId= setInterval(function(){
        
        localTimeElement.textContent=  clock(SelectedCountry);
    },1000)

}

addLanguagesTags(Object.values(SelectedCountry[0].languages))
addNeighborsTags(SelectedCountry[0].borders)
insertHeaderSelection(SelectedCountry[0])
localStorage.setItem('userCountry',JSON.stringify(SelectedCountry))

}

searchBtn.addEventListener("click",ShowMainCard

)

//-------view Header selection (shared accorss views)-----//

function insertHeaderSelection(country)
{
    if(SelectedCountry)
    {
    var headerSelection=document.getElementsByClassName("view-header-selection")
    
    for(let i=0;i<headerSelection.length;i++)
    {
        headerSelection.item(i).innerHTML=`
        <div class="current-selection-badge">
                <img src="${country.flags.png}" alt="Egypt" class="selection-flag">
                <span>${country.name.common}</span>
                <span class="selection-city">${country.capital} </span>
              </div>
            </div>`
            headerSelection.item(i).style.display='block';
    }

    }

}


//--------Holidays-------//

var holidaySection=document.getElementById("holidays-content")
async function assignHolidays()
{

    if(SelectedCountry)
    {
        let holidays=await Get_Holidays_By_Year(new Date().getFullYear(),SelectedCountry[0].altSpellings[0])
        console.log(holidays)  
         
        for(let i=0;i<holidays.length;i++)
        {
            insertHolidayCard(holidays[i])   
        }

    }
}
function insertHolidayCard(holiday)
{
    let date =new Date(holiday.date);
    console.log(date)
    holidaySection.insertAdjacentHTML("beforeend",
        `  <div class="holiday-card">
              <div class="holiday-card-header">
                <div class="holiday-date-box"><span class="day"> ${date.toLocaleString('defualt',{day:`2-digit`})} </span><span class="month">${date.toLocaleString('default',{month:'short'})}</span></div>
                <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
              </div>
              <h3>${holiday.localName}</h3>
              <p class="holiday-name">${holiday.name}</p>
              <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${date.toLocaleString('defualt',{weekday:`long`})} </span>
                <span class="holiday-type-badge">Public</span>
              </div>
            </div>`
        )
    let loveButton=holidaySection.getElementsByClassName("holiday-action-btn")
    loveButton.item(loveButton.length-1).addEventListener('click',function()
{
    showToast("the holiday have been saved successfully")
    CardRecord.Type='holiday'
   CardRecord.content=CreateHolidayFav(holiday.localName,date.toLocaleString('defualt',{day:`2-digit`,month:'short'}),SelectedCountry[0].capital)
   CardCounter++; 
   CardRecord.index=CardCounter;
    console.log("pushing",CardRecord)
            CardList.push({Type:CardRecord.Type,content:CardRecord.content,index:CardRecord.index})
    console.log("Card list after push:",CardList)
    savePlan(CardRecord.content)
    
})
    
}
function resetHolidaySection()
{
    holidaySection.innerHTML=``
}

//----------long Weekends--------//
var longWeekendSection=document.getElementById("lw-content")

async function assignLongWeekend()
{
    if(SelectedCountry)
    {
        let weekends=await Get_Long_Weekends(new Date().getFullYear(),SelectedCountry[0].altSpellings[0])
        console.log(weekends)  
         
        for(let i=0;i<weekends.length;i++)
        {
            insertLWCard(weekends[i],i)   
        }

    }
    
}
function insertLWCard(weekend,count)
{
    let startDate=new Date(weekend.startDate)
    let endDate=new Date(weekend.endDate)
    
    console.log("inserting the long Weekend:",weekend)
    let date = `${startDate.toLocaleString('default',{month:'short'})} ${startDate.toLocaleString('default',{day:'2-digit'})} - ${endDate.toLocaleString('default',{month:'short'})} ${endDate.toLocaleString('default',{day:'2-digit'})}, ${endDate.getFullYear()}`
    longWeekendSection.insertAdjacentHTML("beforeend",
        `
        <div class="lw-card">
              <div class="lw-card-header">
                <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${weekend.dayCount} Days</span>
                <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
              </div>
              <h3>Long Weekend #${count+1}</h3>
              <div class="lw-dates"><i class="fa-regular fa-calendar"></i>${date} </div>
              <div class="lw-info-box success"><i class="fa-solid fa-check-circle"></i> ${weekend.needBridgeDay?'bridge days would be needed..':'No extra days off needed!'}</div>
              <div class="lw-days-visual">
       
              </div>
            </div>
        `)
        let loveButton=document.getElementsByClassName('holiday-action-btn')
        loveButton.item(loveButton.length-1).addEventListener('click',function()
        {
                showToast("the Plan have been saved successfully")
         CardRecord.Type='LongWeekend'
        CardRecord.content=CreateLWFav(` ${weekend.dayCount} Days`,date,`${weekend.needBridgeDay?'bridge days would be needed..':'No extra days off needed!'}`)
      
        CardCounter++;
        CardRecord.index=CardCounter;
        console.log("pushing",CardRecord)
        CardList.push({Type:CardRecord.Type,content:CardRecord.content,index:CardRecord.index})
            console.log("Card list after push:",CardList)

    savePlan(CardRecord.content)
        })
        let lw_visual=document.getElementsByClassName("lw-days-visual")
        lw_visual.item(count).innerHTML=
        `        
         <div class="lw-day"><span class="name">${startDate.toLocaleString('default',{weekday:'short'})}</span><span class="num">${startDate.toLocaleString('default',{day:'2-digit'})}</span></div>
        
         `
         for(let  i=1;i<weekend.dayCount;i++)
        {
           let start=new Date(startDate)
           lw_visual.item(count).innerHTML+=
           `
           <div class="lw-day weekend"><span class="name">${ new Date(start.setDate(start.getDate()+i)).toLocaleString('default',{weekday:'short'})}</span><span class="num"> ${ new Date(start.setDate(start.getDate())).toLocaleString('default',{day:'2-digit'})}</span></div>
           `
        }
        
}
function resetLongWeekend()
{
    longWeekendSection.innerHTML=``
}
//------------Events----------//
var eventSection=document.getElementById("events-content")

async function  assignEvents()
{
    if(SelectedCountry)
    {
        let events=(await Search_Events_By_City("",SelectedCountry[0].altSpellings[0],20))?._embedded?.events
        console.log('events retrieved:',events)
        if(events)
        {

            for(let i=0;i<events.length;i++)
                {
                    insertEventCard(events[i])
                }
        }
    }
    
}
function insertEventCard(event)
{
    console.log("inserting the event:",event)
    let date =new Date(event.dates.start.localDate);
    
    eventSection.insertAdjacentHTML("beforeend",`
         <div class="event-card">
              <div class="event-card-image">
                <img src="${event.images[0].url}" alt="Jazz Night">
                <span class="event-card-category">${(event?.classifications?.at(0)?.genre?.name)??"not classified"}</span>
                <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
              </div>
              <div class="event-card-body">
                <h3>${event.name}</h3>
                <div class="event-card-info">
                  <div><i class="fa-regular fa-calendar"></i>${date.toLocaleString('default',{month:"short"})} ${date.toLocaleString('default',{day:'2-digit'})}, ${date.getFullYear()} at ${event.dates.start.localTime} </div>
                  <div><i class="fa-solid fa-location-dot"></i>${String(event.dates.timezone??"coming soon").replace('/',' , ')}</div>
                </div>
                <div class="event-card-footer">
                  <button class="btn-event"><i class="fa-regular fa-heart"></i> Save</button>
                  <a href="#" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
              </div>
            </div>
        
        `)

}

function resetEventSection()
{
    eventSection.innerHTML=``
}




//----------Weather---------//
var weatherSection=document.getElementById('weather-content')
async function assignWeather()//gonna has many many function
{
    if(SelectedCountry)
    {
        let weather=await Get_Weather_Forecast(SelectedCountry[0].latlng[0],SelectedCountry[0].latlng[1],currentWeather,hourlyWeather,dailyWeather,"auto")
        console.log("weatehr retrived:",weather)
        if(weather)
        {
          
                insertWeatherHero(weather.current)
                insertWeatherDetails(weather)
                insertHourlyForecast(weather.hourly)
                insertWeekForecast(weather.daily)
            
        }
    }

}

function insertWeatherHero(currentWeather)
{

    console.log("inserting current weather:",currentWeather)
    let status=solveWeatherCode(currentWeather.weather_code)
    weatherSection.innerHTML+=
   ` <div class="weather-hero-card ${status.className}">
              
              <div class="weather-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>${SelectedCountry[0].capital}</span>
                <span class="weather-time">Saturday, January 25, 2026</span>
              </div>
              <div class="weather-hero-main">
                <div class="weather-hero-left">
                  <div class="weather-hero-icon"><i class="${status.iconName}"></i></div>
                  <div class="weather-hero-temp">
                    <span class="temp-value">${currentWeather.temperature_2m}</span>
                    <span class="temp-unit">°C</span>
                  </div>
                </div>
                <div class="weather-hero-right">
                  <div class="weather-condition">${status.name} </div>
                  <div class="weather-feels">Feels like ${currentWeather.apparent_temperature}°C</div>
                  <div class="weather-high-low">
                    <span class="high"><i class="fa-solid fa-arrow-up"></i> ${currentWeather.temperature_2m_min||currentWeather.temperature_2m}°</span>
                    <span class="low"><i class="fa-solid fa-arrow-down"></i> ${currentWeather.temperature_2m_max||currentWeather.temperature_2m}°</span>
                  </div>
                </div>
              </div>

    </div>
    `

}
function insertWeatherDetails(weather)
{
    console.log(weather)
    weatherSection.innerHTML+=
    `
      <div class="weather-details-grid">
              <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">${weather.current.relative_humidity_2m}%</span>
                </div>
                <div class="detail-bar">
                  <div class="detail-bar-fill" style="width:${weather.current.relative_humidity_2m}%"></div>
               </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${weather.current.wind_speed_10m} km/h</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${weather.current.uv_index}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${weather.daily.precipitation_probability_max[0]}%</span>
                </div>
              </div>
            </div>
            
    `

}

function insertHourlyForecast(hourlyWeather)
{

    console.log("isnerting houly weather:",hourlyWeather)
    var element= document.createElement('div')
    let date=new Date(clock(SelectedCountry))
    element.innerHTML=`<div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
              <div class="hourly-scroll">
               
              
              </div>
            </div>`
            element.getElementsByClassName("hourly-scroll").item(0).innerHTML=
            `
             <div class="hourly-item now">
                  <span class="hourly-time">Now</span>
                  <div class="hourly-icon"><i class="${solveWeatherCode(hourlyWeather.weather_code[date.getHours()]).iconName}"></i></div>
                  <span class="hourly-temp">${Number(hourlyWeather.temperature_2m[date.getHours()]).toFixed(0)}°</span>
                </div>
              
                `
                let Switcher=true;//to decide PM/AM
            for(let i=1;i<24;i++)
            {
                let ActualHour=i+date.getHours();
                if((date.getHours()+i-1)%12==0)
                {
                    Switcher=!Switcher;
                    
                }
                while(ActualHour>12)
                {
                ActualHour-=12
                }
               
                
                element.getElementsByClassName("hourly-scroll").item(0).innerHTML+=
            `
             <div class="hourly-item">
                  <span class="hourly-time">${ActualHour}${Switcher?"AM":"PM"}</span>
                  <div class="hourly-icon"><i class="${solveWeatherCode(hourlyWeather.weather_code[ActualHour]).iconName}"></i></div>
                  <span class="hourly-temp">${Number(hourlyWeather.temperature_2m[ActualHour]).toFixed(0)}°</span>
                </div>
              
                `

            }
        
    weatherSection.innerHTML+=element.outerHTML

}

function insertWeekForecast(dailyWeather)
{
    console.log('inserting daily weather:',dailyWeather)
    let forecastElement=document.createElement("div")
    forecastElement.innerHTML=` <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
              <div class="forecast-list">
               
               
              </div>
            </div>`
    let forecastList=forecastElement.getElementsByClassName("forecast-list")
    console.log(forecastList.item(0))
    for(let i=0;i<7;i++)
    {
        if(i==0)
        forecastList.item(0).innerHTML+=
        `
     
        <div class="forecast-day today">
        <div class="forecast-day-name"><span class="day-label">Today</span><span class="day-date">${new Date().toLocaleString('default',{day:'2-digit'})} ${new Date().toLocaleString('default',{month:'short'})}</span></div>
        <div class="forecast-icon"><i class="${solveWeatherCode(dailyWeather.weather_code[i]).iconName}"></i></div>
        <div class="forecast-temps"><span class="temp-max">${Number(dailyWeather.temperature_2m_max[i]).toFixed(0)}°</span><span class="temp-min"> ${Number(dailyWeather.temperature_2m_min[i]).toFixed(0)} °</span></div>
        <div class="forecast-precip"></div>
        </div>
     
        `
        else
            forecastList.item(0).innerHTML+=
        `
      
        <div class="forecast-day ">
        <div class="forecast-day-name"><span class="day-label">${new Date(dailyWeather.time[i]).toLocaleString("default",{weekday:'short'})}</span><span class="day-date">${new Date(dailyWeather.time[i]).toLocaleString('default',{day:'2-digit'})} ${new Date(dailyWeather.time[i]).toLocaleString('default',{month:'short'})}</span></div>
        <div class="forecast-icon"><i class="${solveWeatherCode(dailyWeather.weather_code[i]).iconName}"></i></div>
        <div class="forecast-temps"><span class="temp-max">${Number(dailyWeather.temperature_2m_max[i]).toFixed(0)}°</span><span class="temp-min">${Number(dailyWeather.temperature_2m_min[i]).toFixed(0)}°</span></div>
        <div class="forecast-precip"></div>
        </div>
    
        `
            
    }
    
    weatherSection.innerHTML+=forecastElement.outerHTML
}

function resetWeatherSection()
{
    weatherSection.innerHTML=``
}


function solveWeatherCode(num)
{
         if(num==0||num==1){return {className:'weather-sunny',name:'Sunny', iconName:"fa-solid fa-sun" }}
    else if(num==2||num==3){return {className:'weather-cloudy',name:'cloud', iconName:'fa-solid fa-cloud'}}
    else if(40<num&&num<50){return {className:'weather-foggy',name:'fogs', iconName:'fa-solid fa-smog'}}
    else if(50<num&&num<66){return {className:'weather-rainy',name:'rain', iconName:'fa-solid fa-cloud-rain'}}
    else if(70<num&&num<80){return {className:'weather-snowy',name:'snow', iconName:'fa-solid fa-snowflake'}}
    else if(80<num&&num<100){return {className:'weather-stormy',name:'storm', iconName:'fa-solid fa-cloud-bolt'}}
         else{return {className:'weather-default',name:'normal',iconName:'fa-solid fa-sun'}}

        /**0	Clear sky
1, 2, 3	Mainly clear, Partly cloudy, Overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense
61, 63, 65	Rain: Slight, moderate, and heavy
71, 73, 75	Snow fall: Slight, moderate, and heavy
80, 81, 82	Rain showers: Slight, moderate, and violent
95, 96, 99	Thunderstorm: Slight, moderate with hail */

/*
.weather-sunny
.weather-cloudy
.weather-rainy
.weather-snowy
.weather-stormy
.weather-foggy
.weather-defaul*/
}
//---------sunTimes--------//
var sun_main=document.getElementById("sun-times-content")


async function assignSunTimes()
{
    let SunsetData=await Get_Sun_Times_for_Location(SelectedCountry[0].latlng[0],SelectedCountry[0].latlng[1],new Date().toISOString(),0)   
   console.log("SussetData:",SunsetData)
   console.log(new Date(SunsetData.results.civil_twilight_begin).toLocaleString('default',{hour:'numeric'}))
    sun_main.innerHTML+=
    `
      <div class="sun-main-card">
              <div class="sun-main-header">
                <div class="sun-location">
                  <h2><i class="fa-solid fa-location-dot"></i>${SelectedCountry[0].capital}</h2>
                  <p>Sun times for your selected location</p>
                </div>
                <div class="sun-date-display">
                  <div class="date">${new Date(clock(SelectedCountry)).toLocaleString('default',{month:'long',day:'2-digit',year:"numeric"})}</div>
                  <div class="day">${new Date(clock(SelectedCountry)).toLocaleString("default",{weekday:'long'})}</div>
                </div>
              </div>
              
              <div class="sun-times-grid">
                <div class="sun-time-card dawn">
                  <div class="icon"><i class="fa-solid fa-moon"></i></div>
                  <div class="label">Dawn</div>
                  <div class="time">${new Date(SunsetData.results.civil_twilight_begin).toLocaleString('default',{hour:'numeric'})} </div>
                  <div class="sub-label">Civil Twilight</div>
                </div>
                <div class="sun-time-card sunrise">
                  <div class="icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="label">Sunrise</div>
                  <div class="time">${new Date(SunsetData.results.sunrise).toLocaleString('default',{hour:'numeric'})}</div>
                  <div class="sub-label">Golden Hour Start</div>
                </div>
                <div class="sun-time-card noon">
                  <div class="icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="label">Solar Noon</div>
                  <div class="time">${new Date(SunsetData.results.solar_noon).toLocaleString('default',{hour:'numeric'})}</div>
                  <div class="sub-label">Sun at Highest</div>
                </div>
                <div class="sun-time-card sunset">
                  <div class="icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="label">Sunset</div>
                  <div class="time">${new Date(SunsetData.results.sunset).toLocaleString('default',{hour:'numeric'})}</div>
                  <div class="sub-label">Golden Hour End</div>
                </div>
                <div class="sun-time-card dusk">
                  <div class="icon"><i class="fa-solid fa-moon"></i></div>
                  <div class="label">Dusk</div>
                  <div class="time">${new Date(SunsetData.results.civil_twilight_end).toLocaleString('default',{hour:'numeric'})}</div>
                  <div class="sub-label">Civil Twilight</div>
                </div>
                <div class="sun-time-card daylight">
                  <div class="icon"><i class="fa-solid fa-hourglass-half"></i></div>
                  <div class="label">Day Length</div>
                  <div class="time">${Number(SunsetData.results.day_length/60/60).toFixed(0)} hours</div>
                  <div class="sub-label">Total Daylight</div>
                </div>
              </div>
            </div>
            
            <div class="day-length-card">
              <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
              <div class="day-progress">
                <div class="day-progress-bar">
                  <div class="day-progress-fill" style="width:${(Number(SunsetData.results.day_length/60/60).toFixed(0)/24)*100}%"></div>
                </div>
              </div>
              <div class="day-length-stats">
                <div class="day-stat">
                  <div class="value">10h 42m</div>
                  <div class="label">Daylight</div>
                </div>
                <div class="day-stat">
                  <div class="value">44.6%</div>
                  <div class="label">of 24 Hours</div>
                </div>
                <div class="day-stat">
                  <div class="value">13h 18m</div>
                  <div class="label">Darkness</div>
                </div>
              </div>
            </div>
    
    `

}

function resetSunMain()
{
    sun_main.innerHTML=``
}


//-------------my plans------//

var CardCounter=0
var CardRecord={Type:"holiday",content:``,index:0}
var CardList=[];
if(localStorage.getItem('SavedPlans')!=null)
{
    CardList=JSON.parse(localStorage.getItem('SavedPlans'))
    for(let i=0;i<CardList.length;i++)
        {
        console.log("cardList",i,":",CardList[i])
        savePlan(CardList[i].content)
    }
}
function savePlan(card)
{
    let empty=document.getElementsByClassName("empty-state")
    let planContent=document.getElementById("plans-content")
    if(empty.length>0)
    empty.item(empty.length-1).remove()

    planContent.insertAdjacentHTML('beforeend',card)
    console.log("card list being Saved:",CardList)
    localStorage.setItem('SavedPlans',JSON.stringify(CardList))


}

function CreateHolidayFav(holidayName,Date,location)
{
    return`
    <div class="plan-card">
        <span class="plan-card-type holiday">Holiday</span>
        <div class="plan-card-content">
          
        <h4>${holidayName}</h4>
        <div class="plan-card-details">
          <div><i class="fa-regular fa-calendar"></i>${Date}</div>
          <div><i class="fa-solid fa-location-pin"></i>${location}</div>
        </div>
      
          <div class="plan-card-actions">
            <button class="btn-plan-remove">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> Remove
            </button>
          </div>
        </div>
      </div>
    `
}

function CreateLWFav(DayCount,date,bridge)
{console.log("datin:",date)
   return `<div class="plan-card">
        <span class="plan-card-type longweekend">Long Weekend</span>
        <div class="plan-card-content">
          
        <h4>${DayCount} Long Weekend</h4>
        <div class="plan-card-details">
          <div><i class='fa-solid fa-calendar'></i>${date}</div>
          <div><i class='fa-solid fa-info-circle'> </i> ${bridge}</div>
        </div>
      
          <div class="plan-card-actions">
            <button class="btn-plan-remove" >
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> Remove
            </button>
          </div>
        </div>
      </div>`
}

function showToast(TextContent)
{
    let toast=document.getElementById("toast-container")
    setTimeout(() => {
    toast.innerHTML=''
        
    }, 3000);

   
toast.innerHTML=`<div class="toast success ">

      <i class="fa-regular fa-circle-check" style='display:inline;'></i> <span>${TextContent}</span>
    </div>`
   

}
function showLoading()
{
    let loading=document.getElementById("loading-overlay")
    loading.classList.remove("hidden")
}
function hideLoading()
{
    let loading=document.getElementById("loading-overlay")
    loading.classList.add('hidden')

}

function removePlan(btn)
{
    btn.remove()

}
/*left for last:
1-loading screen
2-cruds
3-empty view
4-dashboard top header date :>
5-local storage data should be appeared in country-city search, main grid,headerselection without clicking explore
6-weather state are clear , even for negative celisus

*/

