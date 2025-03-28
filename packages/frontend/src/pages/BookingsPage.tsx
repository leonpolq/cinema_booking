import React from 'react';
import {Layout} from '../components/Layout';
import {Bookings} from "../components/Bookings";

const BookingsPage: React.FC = () => {
    return (
        <Layout>
            <Bookings/>
        </Layout>
    );
};

export default BookingsPage;