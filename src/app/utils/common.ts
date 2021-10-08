export function randomNumberAToB(a: number, b: number) {
    if (b - a <= 0 || a <= 0) return -1;

    const range = b - a;
    const random = Math.round(Math.random() * range);
    return a + random;
}