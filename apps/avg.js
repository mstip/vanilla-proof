export default function avg(params) {
    return params.reduce((p, c) => p + c, 0) / params.length;
}
