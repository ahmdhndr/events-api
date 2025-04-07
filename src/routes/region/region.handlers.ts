import type { Request, Response } from "express";

import { regions } from "@/db/schemas";
import { handleError } from "@/lib/handle-error";

export async function findByCityName(req: Request, res: Response) {
  try {
    const { name } = req.query;
    const result = await regions.findByCity(`${name}`);
    res.json({
      status: "success",
      message: "Region by city name fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
export async function getAllProvinces(req: Request, res: Response) {
  try {
    const result = await regions.getAllProvinces();
    res.json({
      status: "success",
      message: "Provinces fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
export async function getProvince(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await regions.getProvince(Number(id));
    res.json({
      status: "success",
      message: "Province fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
export async function getRegency(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await regions.getRegency(Number(id));
    res.json({
      status: "success",
      message: "Regencies fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
export async function getDistrict(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await regions.getDistrict(Number(id));
    res.json({
      status: "success",
      message: "Districts fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
export async function getVillage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await regions.getVillage(Number(id));
    res.json({
      status: "success",
      message: "Villages fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
};
