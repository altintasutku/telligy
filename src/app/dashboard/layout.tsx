import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

const DashboardLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
      <div id="modal-root"/>
    </>
  );
};

export default DashboardLayout;
