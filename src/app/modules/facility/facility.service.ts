import { Facility } from './facility.model';
import { TFacility } from "./facility.interface";

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getSingleFacility = async (id: string) => {
  const result = await Facility.findOne({ _id: id, isDeleted: false });
  return result;
};

// Paginated facility retrieval
const getAllFacilities = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const result = await Facility.find({ isDeleted: false })
    .skip(skip)
    .limit(limit);
  const total = await Facility.countDocuments({ isDeleted: false });

  return { facilities: result, total, page, limit };
};

const updateFacility = async (id: string, payload: Partial<TFacility>) => {
  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const FacilityService = {
  createFacility,
  getSingleFacility,
  getAllFacilities,
  updateFacility,
  deleteFacility,
};
