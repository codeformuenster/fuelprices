import mongoose from 'mongoose';
import { transformIdProperty } from '../../utils/mongodb.js';

const Price = new mongoose.Schema({
  stationId: {type: mongoose.Schema.Types.ObjectId, ref: 'stations'},
  e10: {type: Number, required: true},
  super: {type: Number, required: true},
  diesel: {type: Number, required: true},
  updatedAt: {type: Date, required: true},
  trend: {
    e10: {
      status: {type: String},
      value: {type: Number}
    },
    super: {
      status: {type: String},
      value: {type: Number}
    },
    diesel: {
      status: {type: String},
      value: {type: Number}
    },
  }
}, {
  toJSON: {
    virtuals: true,
    transform: transformIdProperty
  }
});

const PriceSchema = mongoose.model('prices', Price);

export default PriceSchema;