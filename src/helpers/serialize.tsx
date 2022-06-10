import produce from "immer";

import { QuoteData } from "services/quotes/QuotesStore";
import { QuotesApi } from "utils/quotes";

export interface serializeQuoteReturn {
  name: string,
  text: string,
  path: string,
  createAt: Date,
  data: Date,
  idQuote: number
  idAuthor: number
}

export const serializeQuote = (quote: QuotesApi): serializeQuoteReturn => {
  return {
    name: quote.name,
    text: quote.text,
    path: quote.path,
    createAt: quote.created_at,
    data: quote.data,
    idQuote: quote.id_quote,
    idAuthor: quote.id_author,
  }
}

//export const serializeQuote = produce()