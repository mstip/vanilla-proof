export default function t(description, fn) {
    const testing = {
        assert: (result) => {
            if (result !== true) {
                throw new Error(description + " was false");
            }
        },
    };
    try {
        fn(testing);
        console.log(description, "success");
    } catch (e) {
        console.log(description, "fail");
        return false;
    }
    return true;
}
