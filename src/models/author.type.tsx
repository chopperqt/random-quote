export type AuthorsRequests =
  'getAuthors' |
  'createAuthor'

export interface AuthorApi {
  id_author: number;
  created_at: Date;
  name: string;
  path: string;
  avatar: string;
}

export type AuthorID = AuthorApi['id_author']