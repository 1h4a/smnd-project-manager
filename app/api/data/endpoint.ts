import axios from 'axios';
import useSWR from 'swr';

export const api = axios.create({
    baseURL: 'https://6756ae3ec0a427baf949cff5.mockapi.io/api/smnd/',
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function projectData() {
    const { data, error, isLoading } = useSWR('Projects', fetcher)

    return {
        data,
        isLoading,
        isError: error
    }
}

export function deadlineData() {
    const { data, error, isLoading } = useSWR('Deadlines', fetcher)
    return {
        data,
        isLoading,
        isError: error
    }
}