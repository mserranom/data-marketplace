import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import { storiesOf } from "@storybook/react";
import { CategoryList } from "../ui/components/CategoryList";
import { FeedCard } from "../ui/components/FeedCard";

storiesOf("Marketplace Components", module)
  .add("CategoryList", () => <CategoryList />)
  .add("FeedCard", () => <FeedCard />);
