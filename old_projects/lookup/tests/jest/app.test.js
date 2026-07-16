test('.env.test loaded', () => {
    expect(process.env.APP_ENV).toBe('test');
});

