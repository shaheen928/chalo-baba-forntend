
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-8 text-sm md:text-base">
      <div className={step1 ? 'text-blue-500 ' : 'text-slate-500'}>
        {step1 ? <Link to="/login" className='whitespace-nowrap text-xs md:text-sm font-medium'>Login</Link> : 'Login'}
      </div>
      <div className="text-slate-700">➤</div>
      <div className={step2 ? 'text-blue-500 font-bold' : 'text-slate-500'}>
        {step2 ? <Link to="/shipping" className='whitespace-nowrap text-xs md:text-sm font-medium'>Shipping & Payment</Link> : 'Shipping & Payment'}
       </div>
      <div className="text-slate-700">➤</div>
      <div className={step3 ? 'text-blue-500 whitespace-nowrap text-xs md:text-sm font-medium' : 'text-slate-500 whitespace-nowrap text-xs md:text-sm font-medium'}>
        Place Order
      </div>
    </div>
  );
};

export default CheckoutSteps;