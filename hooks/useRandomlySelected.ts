import { createClient } from "urql";
import { useEffect, useState } from "react";
import useArbitrumSubgraph from "./subgraph/useArbitrumSubgraph";

export default async function useRandomlySelected() {
  const result = await useArbitrumSubgraph();

  console.log(result.data.poolDayDatas);

  return result;
}
