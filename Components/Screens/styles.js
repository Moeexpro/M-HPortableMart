import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(()=>({
    root:{
        maxWidth:'100%',
    },
    media:{
        height:5,
        paddingTop:'56.25%',
    },
    cardContent: {
        display:'flex',
        justifyContent:'flex-bottom'
    },
    cardActions:{
    
        display:'flex',
        justifyContent:'flex-end',
    }

}))