import prisma from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export const GET = async () => {
  const response = await prisma.location.findMany()

  
  return NextResponse.json(response)
}