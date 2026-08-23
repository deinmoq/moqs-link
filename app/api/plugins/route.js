import { NextResponse } from "next/server"
import { getPlugins } from "../../../lib/db"

export async function GET() {
  try {
    const plugins = await getPlugins()
    return NextResponse.json({ plugins })
  } catch (err) {
    return NextResponse.json({ error: "Failed to load plugins" }, { status: 500 })
  }
}
