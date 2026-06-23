// backend/src/utils/contentModeration.ts

interface ModerationResult {
  blocked: boolean;
  reason?: string;
}

// Patterns for content moderation
const PATTERNS = {
  csam: [
    /child\s*(?:porn|abuse|exploit)/i,
    /underage\s*(?:sex|porn)/i,
    /minor\s*(?:sex|abuse)/i,
    /child\s*(?:sex|sexual)/i,
  ],
  hateSpeech: [
    /\b(?:racial|ethnic|religious)\s*(?:slur|hate)/i,
    /\b(?:black|white|asian|hispanic)\s*(?:hate|supremacy)/i,
    /\b(?:antisemitic|homophobic|transphobic)/i,
    /\b(?:nazi|white\s*supremacy)/i,
  ],
  violence: [
    /\b(?:kill|murder|slaughter|torture)\s*(?:people|person|child|kid)/i,
    /\b(?:shoot|stab|beat|attack)\s*(?:school|people|crowd)/i,
    /\b(?:bomb|terror|massacre|genocide)/i,
    /\b(?:execut|assassinate)/i,
  ],
  selfHarm: [
    /\b(?:suicide|kill\s*(?:myself|yourself|themself))/i,
    /\b(?:self\s*(?:harm|hurt|injury|mutilation))/i,
    /\b(?:cut\s*(?:myself|yourself|themself|wrist))/i,
    /\b(?:harm\s*(?:myself|yourself))/i,
  ],
};

/**
 * Check if content contains harmful patterns
 * @param text - The text to check
 * @returns { blocked: boolean, reason?: string }
 */
export function checkContent(text: string): ModerationResult {
  // Return safe for empty or whitespace-only text
  if (!text || text.trim().length === 0) {
    return { blocked: false };
  }

  const lowerText = text.toLowerCase().trim();

  // Check each category
  for (const [category, patterns] of Object.entries(PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerText)) {
        return {
          blocked: true,
          reason: category,
        };
      }
    }
  }

  return { blocked: false };
}

/**
 * Assert that content is safe (throws error if blocked)
 * @param text - The text to check
 * @throws {Error} - If content is blocked
 */
export function assertContentSafe(text: string): void {
  const result = checkContent(text);
  if (result.blocked) {
    throw new Error(`Content blocked: ${result.reason}`);
  }
}