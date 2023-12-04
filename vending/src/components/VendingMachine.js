import {useState, useEffect, useCallback} from 'react';
import Card from "../UI/Card";
import VendingCompartment from './VendingCompartment';
import VendingEnjoy from './VendingEnjoy';
import InsertCash from './InsertCash';
import classes from './VendingMachine.module.css';
import VendingKeys from './VendingKeys';
import GiveChange from './GiveChange';

const VendingMachine = () => {
    
    /**************** Vending machine state ****************/
    const [cash, setCash] = useState(0);
    const [change, setChange] = useState(0);
    const [keys, setKeys] = useState(false);
    const [display, setDisplay] = useState('');
    const [machineMessage, setMachineMessage] = useState(false);
    const [machineDone, setMachineDone] = useState(false);

    /************** Fetching and product data **************/
    const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [productList, setProductList] = useState([]);

    /******************* Fetch function ********************/
	const fetchProducts = useCallback( async() => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`https://vending-45841-default-rtdb.europe-west1.firebasedatabase.app/Products.json`);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const prods = await response.json();

			const loadedProducts = [];
			for (const key in prods) {
				loadedProducts.push({
					id: prods[key].id,
					price: prods[key].price,
					title: prods[key].title,
					imageURL: prods[key].imageURL
				})
			}
			setProductList(loadedProducts);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

    useEffect(()=>{
		fetchProducts();
	}, [fetchProducts]);
    /*******************************************************/

    const onRestart = () => {
        setMachineDone(false);
        setChange(0);
    }

    const onCashChange = (total) => {
        if (change > 0) {
            setChange(0);
        }
        setCash(total);
        if (keys) {
            setDisplay('');
            setMachineMessage(1);
        }
    }

    const enabled = (price) => {
        setCash(cash - price);
    }

    const onEnable = (bool) => {
        //setKeys(bool);
        setKeys((prev) => {return prev = bool});
    }

    const onButtonPress = (value) => {
        if (keys) {
            if (display === '' || machineMessage) {
                setDisplay(value);
                setMachineMessage(false);
            } else {
                setDisplay((prev) => { return prev + value });
            }
        }
    }

    const giveProduct = (productPrice) => {
        setChange(cash - productPrice);
        setCash(0);
        setMachineDone(true);
        setDisplay('');
        onEnable(false);
    }

    const onCancel = () => {
        setChange(cash);
    }

    useEffect(() => {
        setDisplay(display);

        if (display !== '' && !machineMessage && display.length >= 3) {
            const found = productList.filter(prod => prod.title === display);
            if (found.length === 0) {
                setDisplay('No such product. Please try again.');
                setMachineMessage(true);
            } else {
                if (cash >= found[0].price) {
                    giveProduct(found[0].price);
                } else {
                    setDisplay('Not enough cash. Please insert more.');
                    setMachineMessage(true);
                }
            }
        }

    }, [display]);
  	
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

    return (
        <>
            <Card className={classes.vending}>
                <header><h3>Get your favorite drinks here.</h3></header>
                {
                    !machineDone ?
                    <VendingCompartment total={cash} enabled={enabled} onEnable={onEnable} products={productList}></VendingCompartment>
                    :
                    <VendingEnjoy onRestart={onRestart} setCash={setCash}></VendingEnjoy>
                
                }
                <div className={classes.panel}>
                    <InsertCash cash={cash} onCashChange={onCashChange} onCancel={onCancel}/>
                    <VendingKeys enabled={keys} displayValue={display} onButtonPress={onButtonPress}></VendingKeys>
                    <GiveChange change={change}></GiveChange>
                </div>
            </Card>
        </>
    )
}

export default VendingMachine;