Basic Setup

```typescript
import { SIARClient, Scope } from "siar-client";

const client = new SIARClient("your-api-key-here");
```

Fetch Available Stations

```typescript
// Get all available stations
const stations = await client.fetchStations();

if (stations.data) {
  stations.data.forEach((station) => {
    console.log(`${station.description} (${station.code})`);
    console.log(`  Location: ${station.municipality}`);
    console.log(`  Coordinates: ${station.latitude}, ${station.longitude}`);
    console.log(`  Altitude: ${station.altitude}m`);
  });
}
```

Fetch Provinces

```typescript
// Get all available provinces
const provinces = await client.fetchProvinces();
console.log("Available provinces:", provinces.data);
```

Fetch Hourly Data. Hourly data is recorded every 30 minutes (48 data points per day).

```typescript
const hourlyData = await client.fetchHourlyData(Scope.Station, {
  ids: ["ALM01"], // Station code
  startDate: "2024-01-01",
  endDate: "2024-01-02",
});

if (hourlyData.data) {
  hourlyData.data.forEach((data) => {
    console.log(`Time: ${data.date} ${data.timeMinutes}min`);
    console.log(`Temperature: ${data.avgTemperature}°C`);
    console.log(`Humidity: ${data.avgHumidity}%`);
    console.log(`Wind Speed: ${data.windSpeed}m/s`);
    console.log(`Precipitation: ${data.precipitation}mm`);
    console.log(`Solar Radiation: ${data.radiation}MJ/m²`);
  });
}
```

Fetch Daily Data

```typescript
const dailyData = await client.fetchDailyData(Scope.Station, {
  ids: ["ALM01"],
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});

if (dailyData.data) {
  dailyData.data.forEach((day) => {
    console.log(`Date: ${day.date}`);
    console.log(`Avg Temperature: ${day.avgTemperature}°C`);
    console.log(`Max/Min: ${day.maxTemperature}°C / ${day.minTemperature}°C`);
    console.log(`Precipitation: ${day.precipitation}mm`);
    console.log(`ET (Penman-Monteith): ${day.etPenmanMonteith}mm`);
  });
}
```

Fetch Weekly Data

```typescript
const weeklyData = await client.fetchWeeklyData(Scope.Province, {
  ids: ["04"], // Province code
  startDate: "2024-01-01",
  endDate: "2024-03-31",
});

if (weeklyData.data) {
  weeklyData.data.forEach((week) => {
    console.log(`Year: ${week.year}, Week: ${week.week}`);
    console.log(`Avg Temperature: ${week.avgTemperature}°C`);
    console.log(`Total Precipitation: ${week.precipitation}mm`);
  });
}
```

Fetch Monthly Data

```typescript
const monthlyData = await client.fetchMonthlyData(Scope.AutonomousCommunity, {
  ids: ["01"], // Autonomous community code
  startDate: "2024-01-01",
  endDate: "2024-12-31",
});

if (monthlyData.data) {
  monthlyData.data.forEach((month) => {
    console.log(`Year: ${month.year}, Month: ${month.month}`);
    console.log(`Days: ${month.numDays}`);
    console.log(`Avg Temperature: ${month.avgTemperature}°C`);
    console.log(`Total Precipitation: ${month.precipitation}mm`);
  });
}
```

Query by Different Scopes
The client supports three different scopes:

```typescript
import { Scope } from "siar-client";

// By Station
await client.fetchDailyData(Scope.Station, {
  ids: ["Station code 1", "Station code 2"],
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});

// By Province
await client.fetchDailyData(Scope.Province, {
  ids: ["Province code"],
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});

// By Autonomous Community
await client.fetchDailyData(Scope.AutonomousCommunity, {
  ids: ["AC Code"],
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});
```

Using Last Modified Date Filter.

This parameter is entirely optional: when included in the request, only data that has been updated within the interval defined by the StartDate and EndDate parameters from the date indicated by the parameter will be retrieved.

```typescript
const data = await client.fetchDailyData(Scope.Station, {
  ids: ["ALM01"],
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  lastModifiedDate: "2024-01-15", // Optional: only get data modified after this date
});
```
