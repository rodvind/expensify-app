import Enzyme from "enzyme";
import Adaptor from "enzyme-adapter-react-16";
//require('dotenv').config({ path: '.env.test' });
import DOTENV from "dotenv";
DOTENV.config({ path: '.env.test' });

// Enzyem.configure: can take all sorts of attributes, a method call to
// configure everything
Enzyme.configure({
    adapter: new Adaptor()
});