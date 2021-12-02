import { PinboardEmbed } from "@thoughtspot/visual-embed-sdk/lib/src/react";
import "../index.css";

export default function StoreSales() {
    return (
        <div>
            <h1>Store Sales</h1>
            <PinboardEmbed frameParams={{height: "80vw"}} fullHeight="true"
                        pinboardId={"41dd8d51-83ad-47ae-bbd1-801439319b0e"}/>
        </div>
            
    );
}