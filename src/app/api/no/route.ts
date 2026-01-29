import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch("https://naas.isalman.dev/no", {
      cache: "no-store",
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { reason?: string };

    if (!data?.reason) {
      return NextResponse.json(
        { error: "No reason returned" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reason: data.reason });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reason" },
      { status: 500 }
    );
  }
}
