import React, { useEffect, useState } from 'react'
import './MainPage.scss'

export default function MainPage() {
	const [currencyData, setCurrencyData] = useState([])
	const [buyPrice, setBuyPrice] = useState(0)
	const [salePrice, setSalePrice] = useState(0)
	const [buyResult, setBuyResult] = useState('')
	const [saleResult, setSaleResult] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [selectValue, setSelectValue] = useState(localStorage.getItem('currency pare') || 'USD / UAH')

	const getData = async () => {
		try{
			const result = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
			const data = await result.json()
	
			setCurrencyData(data)

			if(result.statusText!=='OK'){
				throw new Error(result.statusText)
			}
			
		}
		catch(error){
			throw new Error(error)
		}
	}
	
	useEffect(()=>{
		getData()
	},[])

	const setoptions = () => {
		if(currencyData){
			return currencyData.map( ({ccy, base_ccy}, index) => {
				const optionPare = `${ccy} / ${base_ccy}`
				return(
					<option value={optionPare} key={index}>  
						{ccy} / {base_ccy}
					</option>
				)
			})
		}
	}	

	const setCurrencyPrice = (value) => {
		currencyData.forEach((elem)=>{
			if(value.includes(elem.ccy) && value.includes(elem.base_ccy)){
				setBuyPrice(elem.buy)
				setSalePrice(elem.sale)
			}
		})
	}
	
	const handleSelectPare = ({target:{value}}) => {	
		setSelectValue(value)	
		setCurrencyPrice(value)
		setBuyResult('')
		setSaleResult('')
	}

	useEffect(()=>{
		setCurrencyPrice(selectValue)
	},[currencyData])

	const handleBuyResult = () => {
		setBuyResult((inputValue * buyPrice).toFixed(2))
		setInputValue('')
		setSaleResult('')
	}

	const handleSaleResult = () => {	
		setSaleResult((inputValue * salePrice).toFixed(2))
		setInputValue('')
		setBuyResult('')
	}
	
	const handleInputChange = ({target}) => {
		setInputValue(target.value)
	}

	const handleSavePare = () => {
		localStorage.setItem('currency pare', selectValue)
	}

	return (
		<div className='calcWrap'>
			<input 
				type='number'
				value = {inputValue}
				onChange = {handleInputChange}
			/>
			<select 
				value={selectValue} 
				onChange={handleSelectPare}
			>
				{setoptions()}
			</select>
			<button onClick={handleSavePare}>Сохранить пару</button>

			<h3>Buy : {buyPrice}</h3>
			<h3>Sale : {salePrice}</h3>

			<p>Вы хотите :</p>

			<button onClick={handleBuyResult}>Продать</button>
			<button onClick={handleSaleResult}>Купить</button>
	
			<h2>result : {saleResult || buyResult}</h2>
		</div>
	)
}
