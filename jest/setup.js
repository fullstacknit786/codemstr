import "jest-enzyme";
import "jest-extended";
import "jest-chain";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });