export default ({ env }) => ({
    url: '/admin',
    auth: {
        secret: env('STRAPI_ADMIN_STRAPI_JWT_SECRET'),
    },
    apiToken: {
        salt: env('STRAPI_API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('STRAPI_TRANSFER_TOKEN_SALT'),
        },
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
})
