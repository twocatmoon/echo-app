export default ({ env }) => ({
    upload: {
        config: {
            providerOptions: {
                localServer: {
                    maxage: 300000
                },
            },
            sizeLimit: Number(env('UPLOAD_SIZE_LIMIT', '50')) * 1000 * 1024,
        },
    },
})
