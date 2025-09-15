'use server';

/**
 * @fileOverview AI-powered mentor suggestion flow.
 *
 * - suggestMentors - A function that suggests mentors based on mentee goals and interests.
 * - MentorSuggestionInput - The input type for the suggestMentors function.
 * - MentorSuggestionOutput - The return type for the suggestMentors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentorSuggestionInputSchema = z.object({
  menteeGoals: z
    .string()
    .describe('The goals of the mentee.'),
  menteeInterests: z
    .string()
    .describe('The interests of the mentee.'),
});
export type MentorSuggestionInput = z.infer<typeof MentorSuggestionInputSchema>;

const MentorSuggestionOutputSchema = z.object({
  suggestedMentors: z
    .array(z.string())
    .describe('A list of suggested mentors based on the mentee input.'),
});
export type MentorSuggestionOutput = z.infer<typeof MentorSuggestionOutputSchema>;

export async function suggestMentors(input: MentorSuggestionInput): Promise<MentorSuggestionOutput> {
  return suggestMentorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMentorsPrompt',
  input: {schema: MentorSuggestionInputSchema},
  output: {schema: MentorSuggestionOutputSchema},
  prompt: `You are an AI-powered mentor suggestion system.

You will receive the goals and interests of a mentee. You will respond with an array of potential mentors that would be a good fit for the mentee.

Goals: {{{menteeGoals}}}
Interests: {{{menteeInterests}}}

Potential Mentors:`,
});

const suggestMentorsFlow = ai.defineFlow(
  {
    name: 'suggestMentorsFlow',
    inputSchema: MentorSuggestionInputSchema,
    outputSchema: MentorSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
