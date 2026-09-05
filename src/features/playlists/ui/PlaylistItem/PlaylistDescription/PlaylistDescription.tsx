import type { PlaylistAttributes } from '@/features/playlists/api/playlistsApi.types'

type Props = {
  playlistAttributes: PlaylistAttributes
}

export const PlaylistDescription = ({ playlistAttributes }: Props) => {
  return (
    <>
      <div>title: {playlistAttributes.title}</div>
      {/* <div>description: {playlistAttributes.description}</div> */}
      <div>userName: {playlistAttributes.user.name}</div>
    </>
  )
}
