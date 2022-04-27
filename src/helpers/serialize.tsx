import { IQuote } from "services/quotes";

export const serializeQuote = (quote: IQuote) => {
  return {
    ...quote,
    ...quote.author,
  }
}