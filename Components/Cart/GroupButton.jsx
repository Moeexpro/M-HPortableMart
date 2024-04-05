import React, { useCallback, useState,useContext } from "react";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { LoginContext } from "../../context/contex";

const useStyle = makeStyles({
    component: {
        marginTop: 30
    },
    button :{
        borderRadius: '50%'
    }
})

const GroupedButton = ({cart}) => {
    const classes = useStyle();
    const [ counter, setCounter ] = useState(1);
    const {increase,reduction} = useContext(LoginContext);

    const handleIncrement = () => {
        setCounter(counter => counter + 1 );
        increase(cart.id);
    };

    const handleDecrement = () => {
        setCounter(counter => counter - 1 );
        reduction(cart.id);

    };

    return (
        <ButtonGroup className={classes.component} >
            <Button className={classes.button} onClick={() => handleDecrement()} disabled={counter == 0}>-</Button>
            <Button disabled>{counter}</Button>
            <Button className={classes.button} onClick={() => handleIncrement()}>+</Button>
        </ButtonGroup>
    );
}

export default GroupedButton;