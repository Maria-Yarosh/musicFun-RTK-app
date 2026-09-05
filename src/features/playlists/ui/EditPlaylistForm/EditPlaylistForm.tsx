import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import type { UpdatePlaylistArgs } from '../../api/playlistsApi.types'
import { useUpdatePlaylistMutation } from '../../api/playlistsApi'

type Props = {
  editPlaylist: (playlist: null) => void
  playlistId: string | null
  setPlaylistId: (playlistId: null) => void
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
  register: UseFormRegister<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({ editPlaylist, playlistId, setPlaylistId, handleSubmit, register }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return
    updatePlaylist({ playlistId, data })
    setPlaylistId(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  )
}
