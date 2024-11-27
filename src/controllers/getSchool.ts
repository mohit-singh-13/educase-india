import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const getSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
});

interface SchoolQuery {
  lat?: string;
  lon?: string;
}

const getSchool = async (
  req: Request<{}, {}, {}, SchoolQuery>,
  res: Response
) => {
  const query = req.query;

  if (!query.lat || !query.lon) {
    res.status(400).json({ error: "Latitude and longitude are required." });
    return;
  }

  const latitude = parseFloat(query.lat);
  const longitude = parseFloat(query.lon);

  const validation = getSchema.safeParse({ lat: latitude, lon: longitude });

  if (!validation.success) {
    res.status(422).json({
      success: false,
      message: "Wrong Inputs",
      error: `${validation.error.issues[0].code}: ${validation.error.issues[0].message}`,
    });

    return;
  }

  try {
    const schools = await prisma.$queryRawUnsafe(`
      SELECT name, address,
             (6371 * ACOS(COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) 
             * COS(RADIANS(longitude) - RADIANS(${longitude})) 
             + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) AS distance_in_kilometer,

             (6371 * ACOS(COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) 
             * COS(RADIANS(longitude) - RADIANS(${longitude})) 
             + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) * 1000 AS distance_in_meter
      FROM School
      ORDER BY distance_in_kilometer;
    `);
    

    res.status(200).json({ schools: schools });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Cannot get schools' list from Database",
    });

    return;
  }
};

export default getSchool;
