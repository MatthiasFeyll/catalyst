module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                    browsers: ['> 0.5%, not dead'],
                },
                useBuiltIns: 'usage',
                corejs: 3,
            }
        ],
        [
            '@babel/preset-typescript'
        ]
    ],
    plugins: ["transform-class-properties"]
}