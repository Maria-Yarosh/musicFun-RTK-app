import type { PlaylistData } from '../../api/playlistsApi.types'
import { PlaylistCover } from './PlaylistCover/PlaylistCover'
import { PlaylistDescription } from './PlaylistDescription/PlaylistDescription'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, deletePlaylist, editPlaylist }: Props) => {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} playlistImg={playlist.attributes.images} />
      <PlaylistDescription playlistAttributes={playlist.attributes} />
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  )
}
