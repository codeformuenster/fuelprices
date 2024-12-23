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
        {$unwind: '$prices'},
        {
          $sort: {
            'prices.updateAt': -1
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
            updatedAt: {$first: '$prices.updatedAt'},
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

// TODO: this is scraped data, so lets it will be there for the future
// const test = [
//   {
//     "marketTransparencyId": "916d61b6-7279-4d63-a754-ae160f8cdee2",
//     "location": [ 7.6292753, 51.9545212 ]
//   },
//   {
//     "marketTransparencyId": "48edcf62-4f11-4cd3-8e89-768a357659f6",
//     "location": [ 7.6197495, 51.9583740 ]
//   },
//   {
//     "marketTransparencyId": "c8137d18-edad-4006-9746-18e876b14b1d",
//     "location": [ 7.6661448, 51.9302673 ]
//   },
//   {
//     "marketTransparencyId": "925194e4-0ec4-4c40-b2c1-53b8abece1e2",
//     "location": [ 7.5808501, 51.8935509 ]
//   },
//   {
//     "marketTransparencyId": "f781a0b1-b919-4d6f-a11e-2eb1cd96f1d8",
//     "location": [ 7.6744800, 51.9217491 ]
//   },
//   {
//     "marketTransparencyId": "005056ba-7cb6-1ed2-bceb-86cb05598d30",
//     "location": [ 7.6382051, 51.9020767 ]
//   },
//   {
//     "marketTransparencyId": "005056ba-7cb6-1ed2-bceb-877925600d30",
//     "location": [ 7.7273798, 51.9225502 ]
//   },
//   {
//     "marketTransparencyId": "89e0e90d-5eb7-486a-8b62-25ed2b6688ee",
//     "location": [ 7.6471300, 51.9377289 ]
//   },
//   {
//     "marketTransparencyId": "6e6481ca-530c-4cfd-b5cf-2250c71c7d56",
//     "location": [ 7.5703630, 51.9570961 ]
//   },
//   {
//     "marketTransparencyId": "e94059a7-742b-40da-8436-acf8336e8a21",
//     "location": [ 7.6333299, 51.9072990 ]
//   },
//   {
//     "marketTransparencyId": "a02f3f76-7953-435b-a26a-3d25772097c7",
//     "location": [ 7.6394601, 51.9930000 ]
//   },
//   {
//     "marketTransparencyId": "ee38e65e-8845-4b84-96cb-b22a64a76508",
//     "location": [ 7.6355219, 51.9403496 ]
//   },
//   {
//     "marketTransparencyId": "ce241717-9f68-1ee9-9dea-8d6318b1844e",
//     "location": [ 7.6122398, 51.9919586 ]
//   },
//   {
//     "marketTransparencyId": "2601ce42-1cb9-4c61-a30a-14bffd7512c4",
//     "location": [ 7.5844598, 51.8927917 ]
//   },
//   {
//     "marketTransparencyId": "291fafe3-dbfb-4452-8c68-aa6a7540ce98",
//     "location": [ 7.6004300, 51.9775696 ]
//   },
//   {
//     "marketTransparencyId": "171dd332-51a0-4020-a871-a084731f354b",
//     "location": [ 7.6268740, 51.9317360 ]
//   },
//   {
//     "marketTransparencyId": "7e6c0c6b-4c91-4a14-ba13-2ea3d7803ba9",
//     "location": [ 7.5995402, 51.9339294 ]
//   },
//   {
//     "marketTransparencyId": "cb8e5ecf-0190-4cd7-a55b-56ead27cf737",
//     "location": [ 7.6138501, 52.0007095 ]
//   },
//   {
//     "marketTransparencyId": "420553ba-30a2-4e90-8a68-f72ce019085b",
//     "location": [ 7.6109200, 51.9431610 ]
//   },
//   {
//     "marketTransparencyId": "8e1db284-a4df-4b95-b38e-d17717c496a4",
//     "location": [ 7.6143079, 51.9672661 ]
//   },
//   {
//     "marketTransparencyId": "ec8055b8-cdb5-4414-8558-7444de5fd4ea",
//     "location": [ 7.6557298, 51.9690018 ]
//   },
//   {
//     "marketTransparencyId": "0a0c7df4-cc9a-45f8-9688-b1fe113d595e",
//     "location": [ 7.5385900, 51.9552994 ]
//   },
//   {
//     "marketTransparencyId": "1aa341db-ba24-4887-a9aa-601c97a052a5",
//     "location": [ 7.6249409, 51.9422874 ]
//   },
//   {
//     "marketTransparencyId": "6b2143cb-1cd8-4b4b-b2fb-2502f6ea8b35",
//     "location": [ 7.6044970, 51.9376450 ]
//   },
//   {
//     "marketTransparencyId": "579804cc-8283-4314-a6f0-658d55355710",
//     "location": [ 7.6080289, 51.9721527 ]
//   },
//   {
//     "marketTransparencyId": "15022117-e4b0-4502-92b8-c299ad7cb98b",
//     "location": [ 7.6796899, 52.0112686 ]
//   },
//   {
//     "marketTransparencyId": "6ad3c2cc-4a62-41e6-8bcc-e54081decb5c",
//     "location": [ 7.5509901, 51.9402390 ]
//   },
//   {
//     "marketTransparencyId": "f6bb770a-35fe-4929-abb6-0f9b64d8c9b0",
//     "location": [ 7.5480270, 51.9460945 ]
//   }
// ];