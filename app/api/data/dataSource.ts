import axios from 'axios';
import useSWR from 'swr';

// TODO: Conform API endpoint data to defined types

export const api = axios.create({
    baseURL: 'https://6756ae3ec0a427baf949cff5.mockapi.io/api/smnd/',
})

export const _api = axios.create({
    baseURL: 'https://67576facc0a427baf94cc146.mockapi.io/api/smnd/',
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
export const _fetcher = (url: string) => _api.get(url).then((res) => res.data);

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

export function fileData() {
    const { data, error, isLoading } = useSWR('Files', _fetcher)
    return {
        data,
        isLoading,
        isError: error
    }
}