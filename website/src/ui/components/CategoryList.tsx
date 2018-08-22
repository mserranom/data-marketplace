import * as React from "react";
import { GREY_DARK } from "../../util/colors";
import "./CategoryList.css";

interface CategoryTagProps {
  name: string;
  icon: string;
  onClick: () => void;
}

const CategoryTag = ({ name, icon, onClick }: CategoryTagProps) => (
  <div
    style={{
      position: "relative",
      fontSize: 16,
      color: GREY_DARK
    }}
    onClick={() => onClick()}
  >
    <div style={{ position: "absolute", width: 18, textAlign: "center" }}>
      <i className={`fas fa-${icon}`} />
    </div>
    <div className="label">{name}</div>
  </div>
);

interface Props {
  onCategoryClick: (category: string) => void;
}

export class CategoryList extends React.Component<Props> {
  render() {
    return (
      <div>
        <h5>Categories</h5>
        <CategoryTag
          name="Weather"
          icon="sun"
          onClick={() => this.props.onCategoryClick("Weather")}
        />
        <CategoryTag
          name="Finance"
          icon="money-bill-alt"
          onClick={() => this.props.onCategoryClick("Finance")}
        />
        <CategoryTag
          name="Education"
          icon="graduation-cap"
          onClick={() => this.props.onCategoryClick("Education")}
        />
        <CategoryTag
          name="Smart City"
          icon="hospital"
          onClick={() => this.props.onCategoryClick("Smart City")}
        />
        <CategoryTag
          name="Sports"
          icon="futbol"
          onClick={() => this.props.onCategoryClick("Sports")}
        />
        <CategoryTag
          name="Government"
          icon="university"
          onClick={() => this.props.onCategoryClick("Government")}
        />
        <CategoryTag
          name="News"
          icon="newspaper"
          onClick={() => this.props.onCategoryClick("News")}
        />
        <CategoryTag
          name="Social"
          icon="comments"
          onClick={() => this.props.onCategoryClick("Social")}
        />
      </div>
    );
  }
}
