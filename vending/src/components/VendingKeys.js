import './VendingKeys.css';

const VendingKeys = (props) => {

    return (
        <>
            <div className={`keys` + ` ${props.enabled ? 'enabled' : 'disabled'}`}>
                <h3>Select Product</h3>
                <div className='display'>{props.displayValue}</div>
                <span onClick={() => props.onButtonPress('A')}>A</span>
                <span onClick={() => props.onButtonPress('0')}>0</span>
                <span onClick={() => props.onButtonPress('1')}>1</span>
                <span onClick={() => props.onButtonPress('2')}>2</span>
                <span onClick={() => props.onButtonPress('3')}>3</span>
                <span onClick={() => props.onButtonPress('4')}>4</span>
                <span onClick={() => props.onButtonPress('5')}>5</span>
                <span onClick={() => props.onButtonPress('6')}>6</span>
                <span onClick={() => props.onButtonPress('7')}>7</span>
                <span onClick={() => props.onButtonPress('8')}>8</span>
                <span onClick={() => props.onButtonPress('9')}>9</span>
            </div>
        </>
    )
}

export default VendingKeys;