export const parseArgs = () => {
    const args = process.argv;
    return args.slice(2, args.length).map((arg) => {
        let a = arg.replace(/--/g, '');
        const name = a.split('=')[0];
        const value = a.split('=')[1];
        return { name, value };
    });
};
//# sourceMappingURL=parseArgs.js.map