import classes from './InsertCash.module.css';

const GiveChange = (props) => {
    return (
        <div className={classes.change}>Change: <span>{props.change.toFixed(2)} лв</span></div>
    )
}

export default GiveChange;