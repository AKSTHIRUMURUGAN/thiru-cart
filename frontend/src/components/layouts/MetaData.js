import { Helmet } from "react-helmet-async";

function MetaData({title}) {
    return (
        <Helmet>
            <title>{`${title}-thiru cart`}</title>
        </Helmet>
      );
}

export default MetaData;