import {
  AuthorID,
  QuoteID,
} from "./quotes.type";

export type QuotesAuthorID = number

export interface RelationQuotesAuthorApi {
  id: QuotesAuthorID;
  id_quote: QuoteID;
  id_author: AuthorID;
}