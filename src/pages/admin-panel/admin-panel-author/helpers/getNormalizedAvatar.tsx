import { AuthorImage } from "models/author.type"

const DEFAULT_STRING = 'https://gkywdfbpxquelncihepl.supabase.co/storage/v1/object/public/images/(.*)'

const getNormalizedAvatar = (avatar: AuthorImage) => {
  const formattedAvatar = avatar.match(DEFAULT_STRING)?.[1] || avatar

  console.log(avatar.match(DEFAULT_STRING))

  return formattedAvatar
}

export default getNormalizedAvatar