// In-memory sliding window rate limiter for Next.js API Routes

const requestTracker = new Map();

// Periodic cleanup every 5 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestTracker.entries()) {
      if (now > record.resetTime) {
        requestTracker.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Check if a client IP exceeds a given rate limit
 * @param {string} identifier - Unique client identifier (IP address)
 * @param {number} limit - Maximum requests permitted in window
 * @param {number} windowMs - Window duration in milliseconds (default: 60000ms = 1 min)
 * @returns {{ success: boolean, remaining: number, resetInSeconds: number }}
 */
export function checkRateLimit(identifier, limit = 60, windowMs = 60 * 1000) {
  const now = Date.now();
  const id = identifier || "unknown-client";

  let record = requestTracker.get(id);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs
    };
    requestTracker.set(id, record);
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000)
    };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds)
    };
  }

  record.count += 1;
  const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
  return {
    success: true,
    remaining: limit - record.count,
    resetInSeconds: Math.max(1, resetInSeconds)
  };
}

/**
 * Helper to safely extract client IP from Next.js Request
 * @param {Request} request 
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}
