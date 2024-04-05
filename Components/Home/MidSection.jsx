import { Box, makeStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';
import Banner1 from './Banner 1.jpg'
import Banner2 from './banner2.png'
import Banner3 from './banner3.jpg'


const ImageURL = [
    'https://static.digit.in/default/50c451fd60a33ae80e8475bf9d051f6e73dc580e.jpeg',
    'https://www.slashgear.com/wp-content/uploads/2021/01/o202101081715545216-1280x720.jpg',
    'data:image/png;base64,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'
];

const useStyle = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    image: {
        width: '100%'
    },
    help: {
        [theme.breakpoints.down('md')]: {
            objectFit: 'cover',
            height: 120
        }
    }
}));

const MidSection = () => {
    const classes = useStyle();
    const url = '';
    return (
        <>
            <Grid lg={12} sm={12} md={12} xs={12} container className={classes.wrapper}>
                {
                    ImageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <img src={image} className={classes.image} />
                        </Grid>
                    ))
                }
            </Grid>
            <img src={url} className={clsx(classes.wrapper, classes.help)} style={{width: '100%'}} />
        </>
    )
}

export default MidSection;