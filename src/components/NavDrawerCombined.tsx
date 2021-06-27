import React, { useState } from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

interface NavDrawerCombinedProps {}

const NavDrawerCombined: React.FC<NavDrawerCombinedProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen}/>
    </React.Fragment>
  );
};

export default NavDrawerCombined;
