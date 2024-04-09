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

interface RequestParams {
    fields?: string[]
    populate?: Record<string, RequestParams>
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
        $or?: RequestParams['filters'][]
        $and?: RequestParams['filters'][]
        $not?: RequestParams['filters'][]
    }
}

interface ResponseData <Attributes, Meta = {}> {
    id: string
    attributes: Attributes & {
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
    meta?: Meta
}

interface ResponseError {
    status: number,
    name: string
    message: string
    details: any
}

interface Response <Attributes> {
    data: ResponseData<Attributes>
    meta?: any
    error?: ResponseError
}

interface ResponsePaginated <Attributes> {
    data: ResponseData<Attributes>[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
    error?: ResponseError
}

export function paginate (page: number, pageSize: number) {
    return {
        pagination: {
            page,
            pageSize,
        }
    }
}

export class Collection <Attributes = any> {
    collection: string

    constructor (collection: string) {
        this.collection = collection
    }

    async findOne (id: string, params: RequestParams = {}) {
        try {
            const response = await instance.get<Response<Attributes>>(
                `/${this.collection}/${id}`,
                { params }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async find (page: number, pageSize: number, params: RequestParams = {}) {
        try {
            const response = await instance.get<ResponsePaginated<Attributes>>(
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

    async create (data: Attributes) {
        try {
            const response = await instance.post<Response<Attributes>>(
                `/${this.collection}`,
                { data }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update (id: string, data: Attributes) {
        try {
            const response = await instance.put<Response<Attributes>>(
                `/${this.collection}/${id}`,
                { data }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete (id: string) {
        try {
            const response = await instance.delete<Response<Attributes>>(
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

    async find (params: RequestParams = {}) {
        try {
            const response = await instance.get<Response<Attributes>>(
                `/${this.single}`,
                { params }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update (data: Attributes) {
        try {
            const response = await instance.put<Response<Attributes>>(
                `/${this.single}`,
                { data }
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete () {
        try {
            const response = await instance.delete<Response<Attributes>>(
                `/${this.single}`
            )
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

// #endregion
