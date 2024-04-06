import React from 'react';
import Head from 'next/head';
import HeaderDefault from '../../component/shared/headers/HeaderDefault';
import HeaderMobile from '../../component/shared/headers/HeaderMobile';
import FooterFullwidth from '../../component/shared/footers/FooterFullwidth';


const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = (
    <>
        <FooterFullwidth />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    let titleView;

    if (title !== '') {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;
