import { QuoteData } from "services/quotes";

export const serializeQuote = (quote: QuoteData) => {
  return {
    ...quote,
    ...quote.author,
  }
}