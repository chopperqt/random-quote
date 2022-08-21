import moment from "moment";

import {
  TableAction,
  TableAuthor,
} from "components/table";
import Delete from "../delete/Delete";

import type { Author } from "services/authors";

type AuthorTypes = Pick<Author, 'created_at' | 'id_author' | 'name' | 'path'>

interface GetNormalizedAuthorReturn extends AuthorTypes {
  avatar: JSX.Element;
  actions: JSX.Element;
}

export const getNormalizeAuthor = (author: Author): GetNormalizedAuthorReturn => {
  const {
    created_at: createdAt,
    id_author: authorID,
    avatar,
    name,
  } = author

  return {
    ...author,
    created_at: moment().from(createdAt.toString()),
    avatar: (
      <TableAuthor
        name={name}
        avatar={avatar}
        height={30}
      />
    ),
    actions: (
      <TableAction
        editElement={(<div></div>)}
        deleteElement={(
          <Delete
            authorID={authorID}
            authorImage={avatar}
          />
        )}
      />
    )
  }
}