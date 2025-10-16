import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, type, uid } = body;

    // Verify the secret token (set this in your environment variables)
    if (secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate Prismic cache
    revalidateTag("prismic");

    // Revalidate specific paths if needed
    if (type === "landing_page") {
      revalidatePath("/");
    }

    console.log(`Revalidated Prismic content at ${new Date().toISOString()}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: type || "all",
      uid: uid || "all",
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
