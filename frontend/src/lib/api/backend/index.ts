import axios, { AxiosInstance } from 'axios'
import qs from 'qs'



// #region Axios Instance

const instance: AxiosInstance & { logoutAction?: () => Promise<void> } = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params: Record<string, any>) => {
        return qs.stringify(
            params, 
            { 
                encodeValuesOnly: true,
            }
        );
    },
})

instance.interceptors.response.use(
    (response) => {
        return response
    }, 
    async (error) => {
        if (error.response?.status === 401 && instance.logoutAction) {
            await instance.logoutAction()
        }

        return Promise.reject(error)
    }
)

export function useLogoutAction (cb: () => Promise<void>) {
    instance.logoutAction = cb
}

// #endregion



// #region Bearer Token Management

function setBearerToken (token: string) {
    localStorage.setItem('auth.token', token)
    instance.defaults.headers[ 'Authorization' ] = `Bearer ${token}`
}

function getBearerToken () {
    return localStorage.getItem('auth.token')
}

function removeBearerToken () {
    localStorage.removeItem('auth.token')
    delete instance.defaults.headers[ 'Authorization' ]
}

if (typeof window === 'undefined') {
    instance.defaults.headers[ 'Authorization' ] = `Bearer ${process.env.NEXT_BACKEND_API_TOKEN}`
}

// #endregion 



// #region Authentication

export const auth = {
    async getUser <User extends { id: string }> () {
        const token = getBearerToken()

        if (!token) {
            return Promise.reject('No bearer token found in local storage.')
        }

        setBearerToken(token)

        try {
            const response = await instance.get<User>('/users/me')
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async login <User extends { id: string }> (identifier: string, password: string) {
        console.log(identifier, password)
        try {
            const response = await instance.post<{ user: User, jwt: string }>('/auth/local', {
                identifier,
                password,
            })

            setBearerToken(response.data.jwt)

            return response.data.user
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async logout () {
        removeBearerToken()
    },

    async register <User extends { id: string }> (username: string, email: string, password: string) {
        try {
            const response = await instance.post<{ user: User, jwt: string }>('/auth/local/register', {
                username,
                email,
                password,
            })

            setBearerToken(response.data.jwt)

            return response.data.user
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async sendEmailConfirmation (email: string) {
        try {
            await instance.post('/auth/send-email-confirmation', {
                email,
            })
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async forgotPassword (email: string) {
        try {
            await instance.post('/auth/forgot-password', {
                email,
            })
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async resetPassword (code: string, password: string, passwordConfirmation: string) {
        try {
            await instance.post('/auth/reset-password', {
                code,
                password,
                passwordConfirmation,
            })
        } catch (error) {
            return Promise.reject(error)
        }
    },
}

// #endregion



// #region REST API

interface RESTRequestParams {
    fields?: string[]
    populate?: Record<string, RESTRequestParams>
    sort?: string[]
    publicationState?: 'preview' | 'live'
    locale?: string | string[]
    pagination?: {
        page: number
        pageSize: number
    }
    filters?: {
        $eq?: any
        $eqi?: any
        $ne?: any
        $nei?: any
        $lt?: number
        $lte?: number
        $gt?: number
        $gte?: number
        $in?: any[]
        $notIn?: any[]
        $contains?: string
        $notContains?: string
        $containsi?: string
        $notContainsi?: string
        $null?: boolean
        $notNull?: boolean
        $between?: [number, number]
        $startsWith?: string
        $startsWithi?: string
        $endsWith?: string
        $endsWithi?: string
        $or?: RESTRequestParams['filters'][]
        $and?: RESTRequestParams['filters'][]
        $not?: RESTRequestParams['filters'][]
    }
}

interface RESTResponseData <Attributes, Meta = {}> {
    id: string
    attributes: Attributes & {
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
    meta?: Meta
}

interface RESTResponseError {
    status: number,
    name: string
    message: string
    details: any
}

interface RESTResponse <Attributes> {
    data: RESTResponseData<Attributes>
    meta?: any
    error?: RESTResponseError
}

interface RESTResponsePaginated <Attributes> {
    data: RESTResponseData<Attributes>[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
    error?: RESTResponseError
}

export function paginate (page: number, pageSize: number) {
    return {
        pagination: {
            page,
            pageSize,
        }
    }
}

export function getFiles (form: HTMLFormElement) {
    const files = new FormData()

    for (const [key, value] of (new FormData(form)).entries()) {
        if (value instanceof File) {
            files.append(`files.${key}`, value, value.name)
        }
    }

    return files
}

export class Collection <Attributes extends Record<string, any>> {
    collection: string

    constructor (collection: string) {
        this.collection = collection
    }

    async findOne (id: string, params: RESTRequestParams = {}) {
        try {
            const response = await instance.get<RESTResponse<Attributes>>(
                `/${this.collection}/${id}`,
                { params }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findMany (page: number, pageSize: number, params: RESTRequestParams = {}) {
        try {
            const response = await instance.get<RESTResponsePaginated<Attributes>>(
                `/${this.collection}`,
                {
                    params: {
                        ...params,
                        ...paginate(page, pageSize),
                    }
            }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async create (data: Attributes, files?: FormData) {
        const formData = files || new FormData()
        formData.append('data', JSON.stringify(data))

        try {
            const response = await instance.post<RESTResponse<Attributes>>(
                `/${this.collection}`,
                formData,
                { headers: { 'Content-Type' : 'multipart/form-data' } },
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update (id: string, data: Attributes, files?: FormData) {
        const formData = files || new FormData()
        formData.append('data', JSON.stringify(data))

        try {
            const response = await instance.put<RESTResponse<Attributes>>(
                `/${this.collection}/${id}`,
                formData,
                { headers: { 'Content-Type' : 'multipart/form-data' } },
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete (id: string) {
        try {
            const response = await instance.delete<RESTResponse<Attributes>>(
                `/${this.collection}/${id}`
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export class Single <Attributes = any> {
    single: string

    constructor (single: string) {
        this.single = single
    }

    async find (params: RESTRequestParams = {}) {
        try {
            const response = await instance.get<RESTResponse<Attributes>>(
                `/${this.single}`,
                { params }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update (data: Attributes) {
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))

        try {
            const response = await instance.put<RESTResponse<Attributes>>(
                `/${this.single}`,
                formData,
                { headers: { 'Content-Type' : 'multipart/form-data' } },
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete () {
        try {
            const response = await instance.delete<RESTResponse<Attributes>>(
                `/${this.single}`
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

// #endregion



// #region Upload API

export interface Media {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats?: {
        [K in 'thumbnail' | 'small' | 'medium' | 'large']: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: string | null
            size: number
            width: number
            height: number
            sizeInBytes: number
        }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any | null
    createdAt: string
    updatedAt: string
}

interface UploadRequestParams {
    ref: string
    refId: string
    field: string
}

export const media = {
    async findOne (id: string) {
        try {
            const response = await instance.get<Media>(
                `/upload/files/${id}`,
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async upload (files: FormData, params: UploadRequestParams) {
        const formData = files
        for (const key in params) {
            formData.append(key, params[key as keyof UploadRequestParams])
        }

        try {
            const response = await instance.post<Media[]>(
                '/upload',
                formData,
                { headers: { 'Content-Type' : 'multipart/form-data' } },
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async updateFileInfo (id: string, fileInfo: { name?: string, alternativeText?: string, caption?: string }) {
        const formData = new FormData()
        formData.append('fileInfo', JSON.stringify(fileInfo))
        
        try {
            const response = await instance.post<Media>(
                `/upload?id=${id}`,
                formData,
                { headers: { 'Content-Type' : 'multipart/form-data' } },
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async delete (id: string) {
        try {
            const response = await instance.delete<Media>(
                `/upload/files/${id}`
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

// #endregion
