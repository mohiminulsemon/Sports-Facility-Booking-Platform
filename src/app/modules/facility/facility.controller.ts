import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res, next) => {
    const result = await FacilityService.createFacilityIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Facility created successfully",
        data : result,
    });
})

const getAllFacilities = catchAsync(async (req, res, next) => {
    const result = await FacilityService.getAllFacility();

    if (result.length > 0) {
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Facility retrieved successfully",
          data: result,
        });
      } else {
        sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "No Data Found",
          data: [],
        });
      }
})

const updateFacility = catchAsync(async (req, res, next) => {
    const result = await FacilityService.updateFacility(req.params.id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Facility updated successfully",
        data : result,
    });
})

const deleteFacility = catchAsync( async (req, res, next) => {
    const result = await FacilityService.deleteFacility(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Facility deleted successfully",
        data : result,
    })
})


export const FacilityController = {
    createFacility,
    getAllFacilities,
    updateFacility,
    deleteFacility
}