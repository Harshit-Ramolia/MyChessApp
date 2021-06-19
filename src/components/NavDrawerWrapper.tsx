import React, { useState } from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

export default function NavDrawerWrapper() {

  const [open, setOpen] = useState<Boolean>(true);

  return (
    <React.Fragment>
      <Navbar setOpen={setOpen}/>
      <Drawer open={open} />
    </React.Fragment>
  );
}
