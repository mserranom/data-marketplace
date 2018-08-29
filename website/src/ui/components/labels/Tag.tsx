import * as React from "react";
import "./Tag.css";

// TODO: tags should have an alias lowercased, it makes Restful calls complicated

interface IconProps {
  name: string;
  icon: string;
}

export const IconTag = ({ name, icon }: IconProps) => (
  <div className="icon-tag">
    <i className={`fas fa-${icon}`} />{" "}
    <span className="tag-label">{" " + name}</span>
  </div>
);

export const Tag = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case "weather":
      return <IconTag name="Weather" icon="sun" />;
    case "finance":
      return <IconTag name="Finance" icon="money-bill-alt" />;
    case "education":
      return <IconTag name="Education" icon="graduation-cap" />;
    case "smart city":
    case "smartcity":
      return <IconTag name="Smart City" icon="hospital" />;
    case "sports":
      return <IconTag name="Sports" icon="futbol" />;
    case "government":
      return <IconTag name="Government" icon="university" />;
    case "news":
      return <IconTag name="News" icon="newspaper" />;
    case "social":
      return <IconTag name="Social" icon="comments" />;
    default:
      return <IconTag name={name} icon="tag" />;
  }
};
