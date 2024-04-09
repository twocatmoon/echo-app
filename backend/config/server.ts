export default ({ env }) => ({
    url: env('NEXT_PUBLIC_BACKEND_URL', 'http://localhost/backend'),
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
        keys: env.array('APP_KEYS'),
    },
    webhooks: {
        populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
})
