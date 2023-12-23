import PropTypes from 'prop-types';

import { ProductDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Details',
};

export default function ProductDetailsPage({ params }) {
  const { id } = params;

  return <ProductDetailsView id={id} />;
}

ProductDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
