import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';

class PhotoGallery extends Component {
    render() {
        const { image } = this.props;

        return (
            <div>
                <Gallery
                    images={image}
                />

            </div>
        );
    }
}

export default PhotoGallery;