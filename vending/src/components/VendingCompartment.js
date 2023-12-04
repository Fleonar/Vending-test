import React, { useState, useEffect, useCallback } from "react";
import VendingItem from "./VendingItem";
import classes from './VendingCompartment.module.css';

function VendingCompartment(props) {
	
  	return (
		<div className={classes.vending}>
		{props.products &&
			props.products.map(product => {
			return <VendingItem key={product.id} product={product} total={props.total} enabled={props.enabled} onEnable={props.onEnable}/>;
			})}
		</div>
  	);
}
export default VendingCompartment;
