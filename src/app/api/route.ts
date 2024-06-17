import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  console.log("GET request received");
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  // ファイルパスを定義
  const filePath = "C:\\Users\\81803\\Desktop\\sync\\data.json";

  // データをファイルに書き込む
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "File saved successfully" });
  } catch (err) {
    console.error("Error writing file:", err);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
