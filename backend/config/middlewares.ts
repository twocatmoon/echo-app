export default ({ env }) => ([
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            origin: env('STRAPI_CORS_ORIGINS').split(',').map((origin) => origin.trim()),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
            keepHeaderOnError: true,
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    {
        name: 'strapi::body',
        config: {
            formLimit: env('STRAPI_UPLOAD_SIZE_LIMIT', '50') + 'mb',
            jsonLimit: env('STRAPI_UPLOAD_SIZE_LIMIT', '50') + 'mb',
            textLimit: env('STRAPI_UPLOAD_SIZE_LIMIT', '50') + 'mb',
            formidable: {
                maxFileSize: Number(env('STRAPI_UPLOAD_SIZE_LIMIT', '50')) * 1000 * 1024,
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
])
