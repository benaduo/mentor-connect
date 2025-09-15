'use server';

/**
 * @fileOverview AI-powered profile improvement suggestions.
 *
 * - suggestProfileImprovements - A function that suggests improvements to a user's profile description.
 * - SuggestProfileImprovementsInput - The input type for the suggestProfileImprovements function.
 * - SuggestProfileImprovementsOutput - The return type for the suggestProfileImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProfileImprovementsInputSchema = z.object({
  profileDescription: z
    .string()
    .describe('The user profile description to be improved.'),
  userGoals: z.string().describe('The user goals as a mentor or mentee.'),
});
export type SuggestProfileImprovementsInput = z.infer<
  typeof SuggestProfileImprovementsInputSchema
>;

const SuggestProfileImprovementsOutputSchema = z.object({
  improvedDescription: z
    .string()
    .describe('The improved user profile description.'),
  reasoning: z.string().describe('The reasoning behind the suggested changes.'),
});
export type SuggestProfileImprovementsOutput = z.infer<
  typeof SuggestProfileImprovementsOutputSchema
>;

export async function suggestProfileImprovements(
  input: SuggestProfileImprovementsInput
): Promise<SuggestProfileImprovementsOutput> {
  return suggestProfileImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProfileImprovementsPrompt',
  input: {schema: SuggestProfileImprovementsInputSchema},
  output: {schema: SuggestProfileImprovementsOutputSchema},
  prompt: `You are an AI-powered profile improvement assistant. Your task is to analyze a user's current profile description and suggest improvements to attract more relevant mentor/mentee matches. Consider the user's goals and provide a revised description along with a clear explanation of why the changes were made.\n\nCurrent Profile Description: {{{profileDescription}}}\nUser Goals: {{{userGoals}}}\n\nImproved Profile Description:`,
});

const suggestProfileImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestProfileImprovementsFlow',
    inputSchema: SuggestProfileImprovementsInputSchema,
    outputSchema: SuggestProfileImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
