import React from 'react';
import FooterDefault from '../../component/shared/footers/FooterDefault';
import BreadCrumb from '../../component/elements/BreadCrumb';
import Newletters from '../../component/partials/commons/Newletters';
import VendorStore from '../../component/partials/vendor/VendorStore';
import PageContainer from '../../component/layouts/PageContainer';

const VendorStorePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Vendor store',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Vendor store">
            <div className="ps-page--single ps-page--vendor">
                <BreadCrumb breacrumb={breadCrumb} />
                <VendorStore />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default VendorStorePage;
