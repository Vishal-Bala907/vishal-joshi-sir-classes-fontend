"use client"

import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import CreateTest from "@/Components/Test/CreateTest";
import TestList from "@/Components/Test/TestList";
import { useState } from "react";


const PracticeTest = () => {

  const [reload, setReload] = useState(0)

  return <>
    <Breadcrumbs mainTitle={'Practice Test'} />
    <CreateTest type="Practice" setReload={setReload} />
    <div>
      <TestList type="Practice" reload={reload} />
    </div>
  </>;
};

export default PracticeTest;
