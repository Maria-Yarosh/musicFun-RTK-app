import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { ChangeEvent } from 'react'
import s from './PlaylistCover.module.css'
import type { Images } from '@/common/types'
import { errorToast } from '@/common/utils'

type Props = {
  playlistId: string
  playlistImg: Images
}

export const PlaylistCover = ({ playlistId, playlistImg }: Props) => {
  const originalCover = playlistImg.main?.find((img) => img.type === 'original')
  const src = originalCover ? originalCover?.url : defaultCover

  const [deletePlaylistCover] = useDeletePlaylistCoverMutation()
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()

  const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.length && event.target.files[0]
    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      errorToast('Only JPEG, PNG or GIF images are allowed')
      return
    }

    if (file.size > maxSize) {
      errorToast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)
      return
    }

    uploadPlaylistCover({ playlistId, file })
  }

  return (
    <>
      <img src={src} alt="cover" className={s.cover} width={'100px'} />
      <input type="file" accept="image/jpeg,image/png,image/gif" onChange={uploadPlaylistCoverHandler} />
      {originalCover && <button onClick={() => deletePlaylistCover(playlistId)}>delete image</button>}
    </>
  )
}
