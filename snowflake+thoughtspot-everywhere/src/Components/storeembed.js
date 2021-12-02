import React from "react";
import { PinboardEmbed} from "@thoughtspot/visual-embed-sdk";


export const Liveboard = () => {
    React.useEffect(() => {
      const tslive = new PinboardEmbed("#tse", {
        frameParams: {
          width: "100%",
          height: "800px",
        },
        pinboardId: "41dd8d51-83ad-47ae-bbd1-801439319b0e", 
      });
      tslive.render();
    }, []);
    return <div id="tse" />;
  };
  