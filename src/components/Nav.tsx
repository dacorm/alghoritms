import React, {useContext} from 'react';
import {Algo, Context} from "../utils/AlgoContext";

const Nav = () => {
    const { settings, setSettings, sort } = useContext(Context)

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setSettings) {
            setSettings(c => ({...c, arrayLen: +e.target.value * 5}))
        }
    }

    const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setSettings) {
            setSettings(c => ({...c, delay: +e.target.value}))
        }
    }

    const onAlgoChange = (type: Algo) => {
        if (setSettings) {
            setSettings(c => ({...c, algoType: type}))
        }
    }

    return (
        <nav className='w-screen bg-gray-300 grid grid-flow-row'>
            <div className='flex items-center justify-center w-full my-2 gap-5'>
                <div>
                    <button
                        className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === 'merge sort' ? 'text-purple-500' : ''}`}
                    onClick={() => onAlgoChange('merge sort')}
                    >Сортировка
                        слиянием
                    </button>
                    <button
                        className={`border border-teal-100 shadow-md py-2 px-4 transition-all active:scale-95 ${settings.algoType === 'insertion sort' ? 'text-purple-500' : ''}`}
                        onClick={() => onAlgoChange('insertion sort')}
                    >Сортировка
                        вставками
                    </button>
                </div>
                <button className='underline' onClick={() => sort(settings.algoType)}>Сортировать</button>
            </div>
            <div className='flex flex-col items-center w-full pb-3'>
                <label htmlFor="items_amount">Длина массива: {settings.arrayLen}</label>
                <input type="range" name="items_amount" id="items_amount" className='w-full max-w-2xl' defaultValue={25} min={1}
                onChange={onAmountChange}
                />
                <label htmlFor="delay">Задержка: {settings.delay}</label>
                <input type="range" name="delay" id="delay" className='w-full max-w-2xl' min={3} defaultValue={15}
                onChange={onDelayChange}
                />
            </div>
        </nav>
    );
};

export default Nav;