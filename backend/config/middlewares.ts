export default ({ env }) => ([
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            origin: env('CORS_ORIGINS').split(',').map((origin) => origin.trim()),
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
            formLimit: env('UPLOAD_SIZE_LIMIT', '50') + 'mb',
            jsonLimit: env('UPLOAD_SIZE_LIMIT', '50') + 'mb',
            textLimit: env('UPLOAD_SIZE_LIMIT', '50') + 'mb',
            formidable: {
                maxFileSize: Number(env('UPLOAD_SIZE_LIMIT', '50')) * 1000 * 1024,
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
])
