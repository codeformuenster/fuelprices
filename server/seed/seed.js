import City from "../mongodb/models/city.js";
import Station from "../mongodb/models/station.js";

import { mainCity, mainStations } from "./seedData.js";
import { createBulk } from "../controllers/stationController.js";
import { fetchAndSavePrice } from "../cron.js";

export const seedDatabase = async () => {
  try {
    const citiesCount = await City.countDocuments();

    if (citiesCount === 0) {
      await City.insertOne(mainCity);

      console.log("Main city added successfully");
    }

    const stationsCount = await Station.countDocuments();

    if (stationsCount === 0) {
      const fakeReqRes = {
        body: { postCode: mainCity.postCode, stationsData: mainStations },
      };

      await createBulk(fakeReqRes, {
        status: (code) => ({
          json: () => console.log(`HTTP ${code}:`),
        }),
      });

      console.log("Main stations added successfully");

      await fetchAndSavePrice();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
