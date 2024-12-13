import cron from 'node-cron';
import * as dotenv from 'dotenv';

import Station from './mongodb/models/station.js';
import Price from './mongodb/models/price.js';

dotenv.config();

const tolerance = 0.02; // Allowed toleranceev for comparison with a floating point

const isEqualZero = (newPrices) => {
  return newPrices.e10 === 0 && newPrices.super === 0 && newPrices.diesel === 0;
};

const calcTrend = (currentPrice, newPrice) => {
  if (Math.abs(newPrice - currentPrice) < tolerance) {
    return '';
  } else if (newPrice > currentPrice) {
    return 'up';
  } else {
    return 'down';
  }
};

export const fetchAndSavePrice = async () => {
  console.log('Cron is working...');
  try {
    const stationsList = await Station.find({});

    const stationIds = stationsList.map(station => ({
      marketTransparencyId: station.marketTransparencyId,
      stationId: station._id
    }));

    const apiResults = await Promise.all(stationIds.map(async ({marketTransparencyId, stationId}) => {
      const response = await fetch(`${process.env.API_URL}?station=${marketTransparencyId}`);
      const result = await response.json();

      result.e10 = parseFloat(result.e10);
      result.super = parseFloat(result.super);
      result.diesel = parseFloat(result.diesel);

      const currentPrices = await Price.findOne(
        {stationId}
      ).sort({updatedAt: -1});

      if (!isEqualZero(result)) {
        return {
          stationId,
          super: result.super,
          e10: result.e10,
          diesel: result.diesel,
          updatedAt: new Date().toISOString(),
          trend: {
            e10: currentPrices && calcTrend(currentPrices.e10, result.e10),
            super: currentPrices && calcTrend(currentPrices.super, result.super),
            diesel: currentPrices && calcTrend(currentPrices.diesel, result.diesel),
          }
        };
      } else {
        return null;
      }
    }));

    await Price.insertMany(apiResults.filter((item) => item !== null));
    console.log('Saving the new prices was successful ', new Date().toISOString());

  } catch (e) {
    console.error('Something went wrong ', e);
  } finally {
    console.log('Cron is finished work');
  }
};

if (process.env.ENV !== 'local') {
  cron.schedule('*/10 * * * *', fetchAndSavePrice);
}