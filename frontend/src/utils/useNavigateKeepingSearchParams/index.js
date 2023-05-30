
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function useNavigateKeepingSearchParams () {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    return (pathname) => navigate({
        pathname,
        search: `?${searchParams.toString()}`
    })
}