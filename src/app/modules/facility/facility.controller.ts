import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res, next) => {
  const result = await FacilityService.createFacility(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Facility created successfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await FacilityService.getAllFacilities(Number(page), Number(limit));

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.facilities.length ? "Facilities retrieved successfully" : "No Data Found",
    data: result.facilities,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
    },
  });
});

const updateFacility = catchAsync(async (req, res, next) => {
  const result = await FacilityService.updateFacility(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res, next) => {
  const result = await FacilityService.deleteFacility(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacilities,
  updateFacility,
  deleteFacility,
};
