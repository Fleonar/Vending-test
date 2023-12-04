import React, { useState, useEffect } from "react";
import classes from './InsertCash.module.css';

function InsertCash({ cash, onCashChange, onCancel }) {
  const [total, setTotal] = useState(cash);

  useEffect(() => {
    setTotal(cash);
  }, [cash]);

  const onItemClick = value => {
    const newTotal = total + value;
    setTotal(newTotal);
    onCashChange(newTotal);
  };
  const onCancelHandler = () => {
    setTotal(0);
    onCashChange(0);
    onCancel();
  };
  return (
    <>
      <div className={classes.container}>
        <h3>Insert cash:</h3>
        <div className={classes.total}>Total: {total.toFixed(2)} лв</div>
        <div className={classes.buttons}>
          <div className={classes.item} onClick={() => onItemClick(0.10)}>10 ст</div>
          <div className={classes.item} onClick={() => onItemClick(0.20)}>20 ст</div>
          <div className={classes.item} onClick={() => onItemClick(0.50)}>50 ст</div>
          <div className={classes.item} onClick={() => onItemClick(1)}>1 лв</div>
          <div className={classes.item} onClick={() => onItemClick(2)}>2 лв</div>
          <div className={classes.item} onClick={() => onItemClick(5)}>5 лв</div>
        </div>
        <div className={classes.cancel} onClick={onCancelHandler}>Cancel</div>
      </div>
    </>
  );
}

export default InsertCash;
