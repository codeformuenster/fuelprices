export const transformIdProperty = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
}