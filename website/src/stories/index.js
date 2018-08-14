import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import { storiesOf } from "@storybook/react";
import { CategoryList } from "../components/explorer/CategoryList";
import { FeedItem } from "../views/FeedItem";

storiesOf("Marketplace Components", module)
  .add("CategoryList", () => <CategoryList />)
  .add("FeedItem", () => <FeedItem />);
