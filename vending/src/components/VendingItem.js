import React, {useEffect} from "react";
import classes from './VendingItem.module.css'

const noImageURL =
   "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";

function VendingItem(props) {
  const { imageURL, title, price } = props.product;

  const available = props.total >= price;

  useEffect(() => {
    props.onEnable(available);
  }, [available])
   

  const onSelect = () => {
    if (price > props.total) return;
    props.enabled(price);
  }

  return (
    <div className={classes.item}>
      <div className={classes.image}><img src={imageURL || noImageURL} /></div>
      <div>{title || "n/a"}</div>
      <div>{price.toFixed(2) || ""} лв</div>
      {
        available ?
            <span className={classes.available}>Available</span>
        :
            <span className={classes.unavailable}>Insert Cash</span>
      }
    </div>
  );
}
export default VendingItem;
