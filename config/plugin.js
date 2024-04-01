module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                s3Options: {
                    accessKeyId: env('AKIAZI2LH25AHVNINL6S'),
                    secretAccessKey: env('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'),
                    region: env('ap-southeast-1'),
                    params: {
                        Bucket: env('task-rabbit-mds'),
                    },
                }
            },
            // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
            actionOptions: {
                upload: {
                    ACL: null
                },
                uploadStream: {
                    ACL: null
                },
            }
        },
    }
});