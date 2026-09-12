import { NextResponse } from "next/server";
import { getPool } from "@/shared/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    await getPool().query("SELECT 1");

    console.log(JSON.stringify({ level: "info", event: "health_check", database: "ok", timestamp }));

    return NextResponse.json({ status: "ok", database: "ok", timestamp });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "health_check_failed",
        component: "database",
        message: error instanceof Error ? error.message : "unknown error",
        timestamp,
      }),
    );

    return NextResponse.json({ status: "error", database: "error", timestamp }, { status: 503 });
  }
}
