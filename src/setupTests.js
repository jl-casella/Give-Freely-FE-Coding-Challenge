import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "jest-enzyme";

const BOGUS_UNMOUNTED_ERROR = (
  "Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"
);
const originalError = console.error.bind(console.error);
console.error = (...args) => !args.toString().includes(BOGUS_UNMOUNTED_ERROR) && originalError(...args);

Enzyme.configure({ adapter: new Adapter() });
