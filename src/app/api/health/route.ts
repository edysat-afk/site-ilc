import { NextResponse } from "next/server";
import { pingRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const redis = await pingRedis();

    return NextResponse.json({
      status: "ok",
      redis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        redis: "unavailable",
        message: error instanceof Error ? error.message : "Erro ao consultar Redis",
      },
      { status: 500 },
    );
  }
}