import { useState } from 'react'
import { EditPlaylistForm } from '../EditPlaylistForm/EditPlaylistForm'
import { PlaylistItem } from '../PlaylistItem/PlaylistItem'
import s from './PlaylistList.module.css'
import { useForm } from 'react-hook-form'
import type { PlaylistData, UpdatePlaylistArgs } from '../../api/playlistsApi.types'
import { useDeletePlaylistMutation } from '../../api/playlistsApi'

type Props = {
  isPlaylistsLoading: boolean
  playlists: PlaylistData[]
}

export const PlaylistList = ({ isPlaylistsLoading, playlists }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        //description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
        const isEditing = playlistId === playlist.id

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylist={deletePlaylistHandler}
                editPlaylist={editPlaylistHandler}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
