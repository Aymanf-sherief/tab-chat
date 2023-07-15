import renderer from "react-test-renderer";
import { MessageBox } from "../../components/MessageBox";
import { user1 } from "../testData";

it("renders correctly", () => {
  const tree = renderer
    .create(<MessageBox selectedUser={user1} addMessage={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
