
'use server';

/**
 * @fileOverview An AI agent for suggesting alternative bus routes based on traffic and preferences.
 *
 * - suggestAlternativeRoutes - A function that suggests alternative routes.
 * - SuggestAlternativeRoutesInput - The input type for the suggestAlternativeRoutes function.
 * - SuggestAlternativeRoutesOutput - The return type for the suggestAlternativeRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeRoutesInputSchema = z.object({
  currentRoute: z.string().describe('The current bus route.'),
  trafficConditions: z.string().describe('The current traffic conditions on the route.'),
  userPreferences: z.string().describe('The user preferences for the route (e.g., fewer stops, scenic route).'),
});
export type SuggestAlternativeRoutesInput = z.infer<typeof SuggestAlternativeRoutesInputSchema>;

const SuggestAlternativeRoutesOutputSchema = z.object({
  alternativeRoutes: z.array(z.string()).describe('An array of alternative bus routes.'),
  reasoning: z.string().describe('The reasoning behind suggesting these alternative routes.'),
});
export type SuggestAlternativeRoutesOutput = z.infer<typeof SuggestAlternativeRoutesOutputSchema>;

export async function suggestAlternativeRoutes(input: SuggestAlternativeRoutesInput): Promise<SuggestAlternativeRoutesOutput> {
  return suggestAlternativeRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeRoutesPrompt',
  input: {schema: SuggestAlternativeRoutesInputSchema},
  output: {schema: SuggestAlternativeRoutesOutputSchema},
  prompt: `You are an expert in suggesting alternative bus routes based on traffic conditions and user preferences.

You will receive the current bus route, the current traffic conditions on the route, and the user preferences for the route.

You will suggest alternative bus routes based on this information, and provide a reasoning for why you are suggesting these routes.

Current Route: {{{currentRoute}}}
Traffic Conditions: {{{trafficConditions}}}
User Preferences: {{{userPreferences}}}

Suggest alternative routes:
`,
});

const suggestAlternativeRoutesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeRoutesFlow',
    inputSchema: SuggestAlternativeRoutesInputSchema,
    outputSchema: SuggestAlternativeRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
