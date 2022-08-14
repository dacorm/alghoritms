const merge = (
    items: number[],
    aux: number[],
    animArr: number[][],
    lo: number,
    mid: number,
    hi: number
) => {
    for (let k = lo; k <= hi; k++) {
        aux[k] = items[k];
    }

    let i = lo,
        j = mid + 1;
    for (let k = lo; k <= hi; k++) {
        if (i > mid) {
            animArr.push([aux[j], k]);
            items[k] = aux[j++];
        } else if (j > hi) {
            animArr.push([aux[i], k]);
            items[k] = aux[i++];
        } else if (aux[i] <= aux[j]) {
            animArr.push([aux[i], k]);
            items[k] = aux[i++];
        } else {
            animArr.push([aux[j], k]);
            items[k] = aux[j++];
        }
    }
};

export const getMergeSortAnims = (
    items: number[],
    aux: number[],
    animArr: number[][],
    lo: number,
    hi: number
) => {
    if (lo >= hi) return;

    const mid = lo + Math.floor((hi - lo) / 2);

    getMergeSortAnims(items, aux, animArr, lo, mid);
    getMergeSortAnims(items, aux, animArr, mid + 1, hi);
    merge(items, aux, animArr, lo, mid, hi);
};