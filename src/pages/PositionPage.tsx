import React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import { Product } from "../components/interface";
import { SizeChoice } from "../components/SizeChoice/SizeChoice";
import { PositionContent } from "../components/PositionContent/PositionContent";

export function PositionPage({
  addPositionToCart,
}: {
  addPositionToCart: (positionToCart: Product) => void;
}) {
  const { model } = useParams<{ model: string }>();
  const [favouritePositions, spikesData, cartPositions] = useContext(MyContext);
  const [sizeChoice, setSizeChoice] = useState(false);

  return (
    <div>
      {sizeChoice ? (
        <SizeChoice
          spikesData={spikesData}
          model={model}
          setSizeChoice={setSizeChoice}
          addToCart={(positionToCart: Product) =>
            addPositionToCart(positionToCart)
          }
        />
      ) : null}
      <PositionContent
        spikesData={spikesData}
        model={model}
        setSizeChoice={setSizeChoice}
      />
    </div>
  );
}
