import * as React from "react";
import { createBrowserRouter, RouterProvider, useNavigate  } from "react-router-dom";
import "./index.css";
import "./App.css";
import "./neon-style.css";

import "./neon-effects.js";

// Pagine originali
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Guide from "./pages/Guide.jsx";

// La lista card/slug viene dalla tua griglia
import { toolsList } from "./components/ToolsGrid.jsx";

// Tool già implementati (devono esistere in src/pages/)
import PriceChecker from "./pages/PriceChecker.jsx";
import AuctionTracker from "./pages/AuctionTracker.jsx";
import BazaarFlipper from "./pages/BazaarFlipper.jsx";
import ProfitCalculator from "./pages/ProfitCalculator.jsx";
import BazaarTracker from "./pages/BazaarTracker.jsx";
import GoldTracker from "./pages/GoldTracker.jsx";

// Placeholder elegante per tool non ancora implementati
function ToolPlaceholder({ title, desc }) {

    const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>← Torna alla Home</button>
      <h1>{title}</h1>
      <p className="read-the-docs">{desc}</p>
      <div className="section">UI in arrivo. Collegheremo qui i dati reali del tool.</div>
    </div>
  );
}

// Se un tool ha pagina reale, usala qui:
const overrides = {
  "gold-tracker": GoldTracker,
  "bazaar-tracker": BazaarTracker,
  "price-checker": PriceChecker,
  "auction-tracker": AuctionTracker,
  "bazaar-flipper": BazaarFlipper,
  "profit-calculator": ProfitCalculator,
};

// Genera TUTTE le rotte /tools/<slug> a partire dalla lista
const toolRoutes = toolsList.map((t) => {
  const Comp = overrides[t.slug];
  return {
    path: `/tools/${t.slug}`,
    element: Comp ? <Comp /> : <ToolPlaceholder title={t.title} desc={t.desc} />,
  };
});

// Router finale: Home originale + Tools + Guide + tutte le rotte tool
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/tools", element: <Tools /> },
  { path: "/guide", element: <Guide /> },
  ...toolRoutes,
],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
