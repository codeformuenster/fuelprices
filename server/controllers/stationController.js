import mongoose from 'mongoose';

import City from '../mongodb/models/city.js';
import Station from '../mongodb/models/station.js';

const {ObjectId} = mongoose.Types;


export const getStationsList = async (req, res) => {
  const {
    cityId
  } = req.query;

  try {
    const response = {
      success: true, data: []
    };

    if (cityId) {
      const cityObjectId = new ObjectId(cityId);
      const city = await City.findById(cityId).lean();
      city.id = city._id;
      delete city._id;

      response.data = await Station.aggregate([
        {
          $match: {'cityId': cityObjectId}
        },
        {
          $lookup: {
            from: 'prices',
            localField: '_id',
            foreignField: 'stationId',
            as: 'prices'
          }
        },
        {
          $unwind: {
            path: '$prices',
          }
        },
        {
          $sort: {
            'prices.updatedAt': -1
          }
        },
        {
          $group: {
            _id: '$_id',
            name: {$first: '$name'},
            address: {$first: '$address'},
            location: {$first: '$location'},
            marketTransparencyId: {$first: '$marketTransparencyId'},
            super: {$first: '$prices.super'},
            e10: {$first: '$prices.e10'},
            diesel: {$first: '$prices.diesel'},
            latestPriceUpdatedAt: {$first: '$prices.updatedAt'},
            trend: {$first: '$prices.trend'}
          }
        },
        {
          $addFields: {
            id: '$_id',
            city: city
          }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: {
            name: 1
          }
        }
      ]);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
};

export const createBulk = async (req, res) => {
  try {
    const {
      postCode,
      stationsData
    } = req.body;

    const city = await City.findOne({postCode});
    const cityId = city._id;

    const currentStations = await Station.find({});
    const currentStationsIds = currentStations.map(({marketTransparencyId}) => marketTransparencyId);

    const filteredStations = stationsData.filter((item) => {
      return !currentStationsIds.some((id) => id === item.marketTransparencyId);
    });

    if (filteredStations.length > 0) {
      const newStationsData = await Promise.all(filteredStations.map(async ({marketTransparencyId, location}) => {
        const response = await fetch(`${process.env.API_URL}?station=${marketTransparencyId}`);
        const result = await response.json();

        return {
          address: result.street,
          name: result.station,
          cityId: cityId,
          marketTransparencyId: marketTransparencyId,
          location: {
            type: 'Point',
            coordinates: location
          }
        };
      }));
      const newData = await Station.insertMany(newStationsData);

      res.status(201).json({success: true, data: newData});
    } else {
      res.status(409).json({success: false, message: 'Stations already exist'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error});
  }
};