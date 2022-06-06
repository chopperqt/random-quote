import { QuoteData } from "services/quotes";

export const serializeQuote = (quote: QuoteData): QuoteData => {
  return {
    ...quote,
    ...quote.author,
  }
}