export type AuthorsRequests =
  'getAuthors' |
  'createAuthor' |
  'deleteAuthor'

export interface AuthorApi {
  id_author: number;
  created_at: Date;
  name: string;
  path: string;
  avatar: string;
}

export type AuthorID = AuthorApi['id_author']
export type AuthorImage = AuthorApi['path']
export type AuthorApiOptional = Partial<AuthorApi>