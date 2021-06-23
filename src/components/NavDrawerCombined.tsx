import React, { useState } from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

interface NavDrawerCombinedProps {}

const NavDrawerCombined: React.FC<NavDrawerCombinedProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} />
      <Drawer open={open} />
    </React.Fragment>
  );
};

export default NavDrawerCombined;
