import produce from "immer";

import { QuoteData } from "services/quotes/QuotesStore";
import { QuotesApi } from "utils/quotes";

export interface serializeQuoteReturn {
  name: string,
  text: string,
  path: string,
  create_at: Date,
  data: Date,
  id_quote: number
  id_author: number
}

export const serializeQuote = (quote: QuotesApi): serializeQuoteReturn => {
  return {
    name: quote.author.name,
    text: quote.text,
    path: quote.author.path,
    create_at: quote.created_at,
    data: quote.data,
    id_quote: quote.id_quote,
    id_author: quote.id_author,
  }
}

//export const serializeQuote = produce()