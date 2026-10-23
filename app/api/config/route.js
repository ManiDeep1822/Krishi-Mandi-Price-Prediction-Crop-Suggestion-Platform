import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ENV_PATH = path.join(process.cwd(), ".env.local");
const KEY_REGEX = /^[A-Za-z0-9_\-\.]{10,128}$/;

export async function GET() {
  const hasDataGov = Boolean(process.env.DATA_GOV_IN_API_KEY && process.env.DATA_GOV_IN_API_KEY.trim().length > 10);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 10);

  // Minimal key masking: reveals only the last 4 characters for verification, never prefixes or large portions
  const maskKey = (key) => {
    if (!key) return "";
    const clean = key.trim();
    if (clean.length <= 4) return "••••••••";
    return `••••••••${clean.slice(-4)}`;
  };

  return NextResponse.json({
    success: true,
    dataGovConfigured: hasDataGov,
    dataGovMasked: maskKey(process.env.DATA_GOV_IN_API_KEY),
    geminiConfigured: hasGemini,
    geminiMasked: maskKey(process.env.GEMINI_API_KEY),
    adminAuthRequired: true,
    storageModel: ".env.local (Server File System Storage - Protected via Admin Passcode)",
    envFilePath: ".env.local"
  });
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("x-admin-key");
    const body = await request.json().catch(() => ({}));
    const { dataGovKey, geminiKey, adminKey } = body;

    const providedAdminKey = (authHeader || adminKey || "").trim();
    const expectedAdminKey = (process.env.ADMIN_SECRET_KEY || "krishi-admin-2026").trim();

    // Constant-time or direct string verification against Admin Secret Passcode
    if (!providedAdminKey || providedAdminKey !== expectedAdminKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or missing Administrative Passcode. Access denied."
        },
        { status: 401 }
      );
    }

    // Input sanitization & validation
    // Disallow CRLF / newlines to prevent environment variable injection
    if (dataGovKey && (/[\r\n]/.test(dataGovKey) || !KEY_REGEX.test(dataGovKey.trim()))) {
      return NextResponse.json(
        { success: false, error: "Validation Error: Data.gov.in API key contains invalid characters or newlines." },
        { status: 400 }
      );
    }

    if (geminiKey && (/[\r\n]/.test(geminiKey) || !KEY_REGEX.test(geminiKey.trim()))) {
      return NextResponse.json(
        { success: false, error: "Validation Error: Gemini API key contains invalid characters or newlines." },
        { status: 400 }
      );
    }

    const currentDataGov = process.env.DATA_GOV_IN_API_KEY || "";
    const currentGemini = process.env.GEMINI_API_KEY || "";
    const currentAdmin = process.env.ADMIN_SECRET_KEY || "krishi-admin-2026";

    const finalDataGov = dataGovKey ? dataGovKey.trim() : currentDataGov;
    const finalGemini = geminiKey ? geminiKey.trim() : currentGemini;

    const envContent = `# Government of India Open Data Platform API Key (Agmarknet Live Mandi Feed)
DATA_GOV_IN_API_KEY=${finalDataGov}

# Google Gemini API Key
GEMINI_API_KEY=${finalGemini}

# Enterprise Administrative Passcode (Controls /api/config write access)
ADMIN_SECRET_KEY=${currentAdmin}
`;

    fs.writeFileSync(ENV_PATH, envContent, "utf-8");

    // Update in-memory process.env
    if (dataGovKey) process.env.DATA_GOV_IN_API_KEY = finalDataGov;
    if (geminiKey) process.env.GEMINI_API_KEY = finalGemini;

    return NextResponse.json({
      success: true,
      message: "Keys securely validated and written to .env.local on the server.",
      storageModel: ".env.local"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save to .env.local" },
      { status: 500 }
    );
  }
}
