import Enzyme from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

// Enzyem.configure: can take all sorts of attributes, a method call to
// configure everything
Enzyme.configure({
    adapter: new Adaptor()
});