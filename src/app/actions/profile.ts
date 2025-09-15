"use server";

import { suggestProfileImprovements, SuggestProfileImprovementsInput, SuggestProfileImprovementsOutput } from "@/ai/flows/suggest-profile-improvements";

export async function getProfileSuggestions(input: SuggestProfileImprovementsInput): Promise<{ suggestions?: SuggestProfileImprovementsOutput, error?: string }> {
  try {
    const suggestions = await suggestProfileImprovements(input);
    return { suggestions };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get AI suggestions.' };
  }
}
