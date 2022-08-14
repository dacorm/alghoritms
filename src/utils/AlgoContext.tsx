import React, {createContext, useEffect, useState} from 'react';
import {getInsertionSortAnims} from "./insertionSort";
import {getMergeSortAnims} from "./mergeSort";

interface Settings {
    algoType: Algo,
    arrayLen: number,
    delay: number,
}

interface Props {
    children: React.ReactNode
}

const initValue: Settings = {
    algoType: "merge sort",
    arrayLen: 25,
    delay: 15
}

export type Algo = 'merge sort' | 'insertion sort'

type SettingsContext = {
    settings: Settings,
    setSettings?: React.Dispatch<React.SetStateAction<Settings>>,
    sort: (algoType: Algo) => void
}

type Items = {
    items: number[],
    setItems?: React.Dispatch<React.SetStateAction<number[]>>,
}

export const ItemsContext = createContext<Items>({items: []})

export const Context = createContext<SettingsContext>({
    settings: initValue,
    sort: () => {
    },
});

const AlgoContext: React.FC<Props> = ({children}) => {
    const [settings, setSettings] = useState<Settings>(initValue);
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        const nums = [];
        for (let i = 0; i < settings.arrayLen; i++) {
            nums.push(Math.floor(Math.random() * 540));
        }
        setItems(nums);
    }, [settings.arrayLen])

    const sort = (algoType: Algo) => {
        switch (algoType) {
            case "insertion sort":
                const {newArr, animArr} = getInsertionSortAnims(items);
                animateDivs(newArr, animArr);
                break;
            case 'merge sort':
                const aux: number[] = [];
                const arr: number[][] = [];
                const nums = [...items]
                getMergeSortAnims(nums, aux, arr, 0, items.length - 1);
                animateMerge(nums, arr);
                break;
            default:
                break;
        }
    }

    const animateDivs = (newArr: number[], arr: number[][]) => {
        arr.forEach(([first, second], i) => {
            const div = document.getElementById(`${first}`);
            const div2 = document.getElementById(`${second}`);
            if (!div || !div2) return;
            setTimeout(() => {
                div.style.backgroundColor = '#b841f0';
                div2.style.backgroundColor = '#b841f0';
                const divHeight = div.style.height;
                div.style.height = div2.style.height;
                div2.style.height = divHeight;
                setTimeout(() => {
                    div.style.backgroundColor = '#482';
                    div2.style.backgroundColor = '#482';
                    if (i === arr.length - 1) {
                        setItems(newArr);
                    }
                }, settings.delay * 5)
            }, settings.delay * i * 5)
        })
    }

    const animateMerge = (newArr: number[], arr: number[][]) => {
        arr.forEach(([newHeight, index], idx) => {
            const div = document.getElementById(`${index}`);
            if (!div) return;
            setTimeout(() => {
                div.style.backgroundColor = "#b041f0";
                div.style.height = `${newHeight / 7}%`;
                setTimeout(() => {
                    div.style.backgroundColor = "#482";
                    if (idx === arr.length - 1) {
                        setItems(newArr);
                    }
                }, settings.delay * 2);
            }, settings.delay * idx * 2);
        });
    };

    return (
        <ItemsContext.Provider value={{items, setItems}}>
            <Context.Provider value={{settings, setSettings, sort}}>
                {children}
            </Context.Provider>
        </ItemsContext.Provider>
    );
};

export default AlgoContext;