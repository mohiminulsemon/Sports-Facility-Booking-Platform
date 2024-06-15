import { Facility } from './facility.model';
import { TFacility } from "./facility.interface";



const createFacilityIntoDB = async (payload : TFacility) => {
    const result = await Facility.create(payload);
    return result;
}

const getSingleFacility = async (id : string) => {
    const result = await Facility.findOne({ _id : id , isDeleted : false});
    return result;
}


const updateFacility = async (id : string, payload : Partial<TFacility>) => {
    const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteFacility = async (id : string) => {
    const result = await Facility.findByIdAndUpdate(id, { isDeleted : true }, { new: true });
    return result;
}

export const FacilityService = {
    createFacilityIntoDB,
    getSingleFacility,
    updateFacility,
    deleteFacility
}