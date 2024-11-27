import { Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const inputSchema = z.object({
  name: z.string(),
  address: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

const addSchool = async (req: Request, res: Response) => {
  const validation = inputSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(422).json({
      success: false,
      message: "Wrong Inputs",
      error: `${validation.error.issues[0].code}: ${validation.error.issues[0].message}`,
    });

    return;
  }

  try {
    const dbData = await prisma.school.create({
      data: {
        name: validation.data.name,
        address: validation.data.address,
        longitude: validation.data.longitude,
        latitude: validation.data.latitude,
      },
    });

    res.status(201).json({
      success: true,
      message: "School inserted successfully",
    });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "School insertion failed",
    });

    return;
  }
};

export default addSchool;
