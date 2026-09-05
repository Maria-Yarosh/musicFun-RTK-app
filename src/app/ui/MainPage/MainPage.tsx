import { useGetMeQuery } from '@/features/auth/api/authApi'

export const MainPage = () => {
  const { data } = useGetMeQuery()

  return (
    <div>
      <h1>Main page</h1>
      <p>login: {data?.login}</p>
    </div>
  )
}
