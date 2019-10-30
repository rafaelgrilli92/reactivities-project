import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
   onClickCreateNewActivity: () => void;
}

const NavBar: React.FC<IProps> = ({
   onClickCreateNewActivity
}) => {
   return (
      <Menu fixed="top" inverted>
         <Container>
            <Menu.Item header>
               <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
               PROJECT
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
               <Button positive content="Create Activity" onClick={onClickCreateNewActivity} />
            </Menu.Item>
         </Container>
      </Menu>
   );
};

export default NavBar;
