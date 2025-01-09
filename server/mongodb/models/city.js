import mongoose from 'mongoose';

const City = new mongoose.Schema({
  name: {type: String, required: true},
  postCode: {type: Number, required: true},
  location: {
    type: {
      type: String,
      enum: [ 'Point' ],
      required: true
    },
    coordinates: {
      type: [ Number ], // [longitude, latitude]
      required: true
    }
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

const CitySchema = mongoose.model('cities', City);

export default CitySchema;