 "use client";

import { useState } from "react";
import WineTypeChipGroup from "@/components/Chip/WineTypeChip/WineTypeChipGroup";
import { WineType } from "@/components/Chip/WineTypeChip/type";

const Home = () => {
  const [selectedWineType, setSelectedWineType] = useState<WineType | null>(
    null
  );

  return (
    <>
      <WineTypeChipGroup
        selectedValue={selectedWineType}
        onChange={setSelectedWineType}
        direction="row"
        showErrorMessage={true}
      />
    </>
  );
};

export default Home;
