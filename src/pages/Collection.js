import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ProductSingle from "../components/ProductSingle";

function Collection({ content }) {
  let { collectionID } = useParams();
  let collection = content[collectionID];

  return (
    <section className="collection">
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_12">
            <h1 className="collection_title page_title">{collection.name}</h1>
            <img src={collection.image} alt={collection.name} />
            <p className="collection_description">{collection.description}</p>
          </div>
          <div className="grid_desktop_12">
            <h2 className="products_headline page_title">Products: </h2>
            <div className="grid_row">
              {Object.keys(collection.products).map(product => {
                return (
                  <div
                    className="grid_desktop_6 grid_tablet_12"
                    key={collection.products[product].name}
                  >
                    <ProductSingle product={collection.products[product]} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapStateToProps(state) {
  return {
    content: state.content,
  };
}

export default connect(MapStateToProps)(Collection);
