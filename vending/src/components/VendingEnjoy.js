import classes from './VendingEnjoy.module.css';

const VendingEnjoy = (props) => {
    const clickHandler = () => {
        props.onRestart();
    }
    return (
        <div className={classes.done}>
            <div className={classes.window}><span>Enjoy your drink!</span></div>
            <button onClick={clickHandler}>Reset</button>
        </div>
    );
}

export default VendingEnjoy;