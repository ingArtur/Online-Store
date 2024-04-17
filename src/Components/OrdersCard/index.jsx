import PropTypes from 'prop-types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props;

    return (
        <div className='flex justify-between items-center mb-4 border border-black rounded-lg p-4 w-80' style={{ background: 'linear-gradient(to right, #ffffff, #f2f2f2)' }}>
            <div className='flex justify-between w-full'>
            <p className='flex flex-col'>
            <span className='font-light'>15.04.2024</span>
            <span className='font-light'>{totalProducts} articles</span>
            </p>
            <p className='flex items-center gap-2'>
            <span className='font-medium text-2xl'>${totalPrice}</span>
            < ChevronRightIcon
             className='h-6 w-6 text-black cursor-pointer'/>
            </p>
            </div>
        </div>
    );
};

OrdersCard.propTypes = {
    totalPrice: PropTypes.node.isRequired,
    totalProducts: PropTypes.node.isRequired,
};

export default OrdersCard;