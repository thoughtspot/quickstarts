import { AppEmbed } from "@thoughtspot/visual-embed-sdk/lib/src/react";
import "../index.css";

export default function FullApp() {
  return (
      <div>
          <h1>Full App</h1>
          <AppEmbed frameParams={{height: "80vw"}} fullHeight="true"
                      pageId="Page.Home" />
      </div>
          
  );
}
